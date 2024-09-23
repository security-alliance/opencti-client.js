import EventEmitter from "events";
import EventSource from "eventsource";
import { sleep } from "./utils.js";
import { Deque } from "@blakeembrey/deque";
import { readFile, rename, writeFile } from "fs/promises";
import { Identifier, StixObject, StixObjectType, StixObjectTypeMap } from "@security-alliance/stix/dist/2.1/types.js";
import { Operation } from "fast-json-patch";

export type UserEventOrigin = {
    socket: string;
    ip: string;
    user_id: string;
    group_ids: string[];
    organization_ids: string[];
    user_metadata: Record<string, any>;
};

export type SyntheticEventOrigin = {
    referer: string;
};

export type EventOrigin = UserEventOrigin | SyntheticEventOrigin;

export type CreateStreamEvent = {
    data: StixObject;
    message: string;
    origin: EventOrigin;
};

export type UpdateStreamEvent = {
    data: StixObject;
    message: string;
    origin: EventOrigin;
    context: {
        patch: Operation[];
        reverse_patch: Operation[];
    };
};

export type DeleteStreamEvent = {
    data: StixObject;
    message: string;
    origin: EventOrigin;
};

export type MergeStreamEvent = unknown;

export type ReconnectingStreamEvent = {
    reason: string;
};

export type ConnectedStreamEvent = {
    lastEventId: string;
    firstEventId: string;
    firstEventDate: string;
    lastEventDate: string;
    streamSize: number;
    connectionId: string;
};

export type OpenCTIStreamState = {
    objects: Map<string, any>;
    lastEventId: string;
};

export type UpdateType = "heartbeat" | "create" | "update" | "delete" | "merge";

export type StateUpdateEvent = {
    lastEventId: string;
    updateType: UpdateType;
    body: any;
};

export const isValidUpdateType = (updateType: string): updateType is UpdateType => {
    return (
        updateType === "heartbeat" ||
        updateType === "create" ||
        updateType === "update" ||
        updateType === "delete" ||
        updateType === "merge"
    );
};

export interface OpenCTIStreamStateManager {
    initialize(): Promise<void>;

    getLastEventId(): string | undefined;

    getObjects(): Record<Identifier, StixObject>;
    getObject<T extends StixObjectType>(id: Identifier<T>): StixObjectTypeMap[T] | undefined;

    commitChange(event: StateUpdateEvent, ready: boolean): Promise<void>;
}

export class InMemoryOpenCTIStreamStateManager implements OpenCTIStreamStateManager {
    protected lastEventId: string;
    protected objects: Record<Identifier, StixObject>;

    constructor() {
        this.lastEventId = "0-0";
        this.objects = {};
    }

    async initialize(): Promise<void> {}

    getLastEventId(): string | undefined {
        return this.lastEventId;
    }

    getObjects(): Record<string, StixObject> {
        return this.objects;
    }

    getObject<T extends StixObjectType>(id: Identifier<T>): StixObjectTypeMap[T] | undefined {
        return this.objects[id] as StixObjectTypeMap[T];
    }

    async commitChange(event: StateUpdateEvent, ready: boolean): Promise<void> {
        switch (event.updateType) {
            case "create":
            case "update":
                const createUpdateData = event.body["data"];
                this.objects[createUpdateData["id"]] = createUpdateData;
                break;
            case "delete":
                const deleteData = event.body["data"];
                delete this.objects[deleteData["id"]];
                break;
        }

        this.lastEventId = event.lastEventId;
    }
}

export class FilesystemOpenCTIStreamStateManager extends InMemoryOpenCTIStreamStateManager {
    private path: string;

    private lastSavedEventId: string;

    constructor(path: string) {
        super();

        this.path = path;
        this.lastSavedEventId = this.lastEventId;
    }

    async initialize(): Promise<void> {
        try {
            const data = JSON.parse(await readFile(this.path, "utf-8"));

            this.lastEventId = data["lastEventId"];
            this.objects = data["objects"];
        } catch (e: any) {
            if (e.code !== "ENOENT") {
                throw e;
            }
        }

        this.lastSavedEventId = this.lastEventId;
    }

    async commitChange(event: StateUpdateEvent, ready: boolean): Promise<void> {
        // it's only safe to write to disk if the stream is ready
        if (ready) {
            const lastEventTime = parseInt(this.lastEventId.split("-")[0]);
            const lastSavedEventTime = parseInt(this.lastSavedEventId.split("-")[0]);

            if (lastEventTime - lastSavedEventTime > 15000) {
                const body = JSON.stringify(
                    {
                        lastEventId: this.lastEventId,
                        objects: this.objects,
                    },
                    undefined,
                    2,
                );

                const tempFile = `${this.path}.tmp`;
                await writeFile(tempFile, body, "utf-8");
                await rename(tempFile, this.path);

                this.lastSavedEventId = this.lastEventId;
            }
        }

        super.commitChange(event, ready);
    }
}

export type OpenCTIStreamOptions = {
    signal?: AbortSignal;
    state?: OpenCTIStreamStateManager;
    noDependencies?: boolean;
    noDelete?: boolean;
    withInferences?: boolean;

    authorization?: string;
};

export declare interface OpenCTIStream {
    emit(event: "create", args: CreateStreamEvent): boolean;
    emit(event: "update", args: UpdateStreamEvent): boolean;
    emit(event: "delete", args: DeleteStreamEvent): boolean;
    emit(event: "merge", args: MergeStreamEvent): boolean;
    emit(event: "reconnecting", args: ReconnectingStreamEvent): boolean;
    emit(event: "connected", args: ConnectedStreamEvent): boolean;
    emit(event: "ready", args: {}): boolean;
    emit(event: "error", args: Error): boolean;

    on(event: "create", listener: (e: CreateStreamEvent) => void): this;
    on(event: "update", listener: (e: UpdateStreamEvent) => void): this;
    on(event: "delete", listener: (e: DeleteStreamEvent) => void): this;
    on(event: "merge", listener: (e: MergeStreamEvent) => void): this;
    on(event: "reconnecting", listener: (e: ReconnectingStreamEvent) => void): this;
    on(event: "connected", listener: (e: ConnectedStreamEvent) => void): this;
    on(event: "ready", listener: (e: {}) => void): this;
    on(event: "error", listener: (e: Error) => void): this;

    on(event: string, listener: Function): this;
}

export class OpenCTIStream extends EventEmitter {
    stream: URL;
    noDependencies: boolean;
    noDelete: boolean;
    withInferences: boolean;
    authorization?: string;

    state: OpenCTIStreamStateManager;

    signal?: AbortSignal;

    started: boolean;
    ready: boolean;

    eventSource: EventSource | undefined;

    connectionId: string | undefined;
    initialLastEventId: string | undefined;

    livenessChecker: NodeJS.Timeout | undefined;

    eventQueue: Deque<StateUpdateEvent>;

    constructor(stream: URL, options?: OpenCTIStreamOptions) {
        super();

        this.stream = stream;
        this.noDependencies = options?.noDependencies !== undefined ? options.noDependencies : false;
        this.noDelete = options?.noDelete !== undefined ? options.noDelete : true;
        this.withInferences = options?.withInferences !== undefined ? options.withInferences : false;
        this.authorization = options?.authorization;

        this.state = options?.state || new InMemoryOpenCTIStreamStateManager();
        this.signal = options?.signal;

        this.signal?.addEventListener("abort", () => {
            this.eventSource?.close();

            clearInterval(this.livenessChecker);
        });

        this.started = false;
        this.ready = false;

        this.eventQueue = new Deque();

        this.startEventWorker();
    }

    public getState(): Record<string, StixObject> {
        return this.state.getObjects();
    }

    public async start() {
        if (this.started) return;

        this.started = true;

        await this.state.initialize();

        this.reconnect("startup");

        this.livenessChecker = setInterval(() => {
            if (this.eventSource === undefined) {
                // reconnecting
                return;
            }

            if (this.eventSource.readyState === EventSource.CLOSED) {
                this.emit("error", new Error("liveness checker detected closed event source"));
                clearInterval(this.livenessChecker);
                return;
            }
        }, 1000 * 60);
    }

    // by default eventsource does not support changing the url when reconnecting, so we wait for an error and do it ourselves
    private reconnect(reason: string) {
        if (this.signal?.aborted) return;

        this.emit("reconnecting", { reason: reason });

        this.connectionId = undefined;
        this.eventSource = undefined;

        const eventSource = new EventSource(this.constructStreamUrl(), {
            headers: this.authorization
                ? {
                      Authorization: `Bearer ${this.authorization}`,
                  }
                : {},
        });

        eventSource.addEventListener("error", (e) => {
            // if the eventsource is closed, we already handled an error on this eventsource, ignore
            if (eventSource.readyState === EventSource.CLOSED) return;

            eventSource.close();

            let reconnectReason: string;

            // this is really hacky, maybe too smart for its own good
            // just checking all the ways that an error may be emitted
            // https://github.com/EventSource/eventsource/blob/v2.0.2/lib/eventsource.js
            if (Object.hasOwn(e, "statusCode")) {
                const statusCode = (e as any).statusCode;
                if (statusCode !== 500 && statusCode !== 502 && statusCode !== 503 && statusCode !== 504) {
                    // we can't reconnect if we receive anything that isn't a temporary server failure
                    this.emit("error", new Error(`unexpected http response code: ${statusCode}`));
                    return;
                }

                reconnectReason = `received temporary server failure: ${statusCode}`;
            } else if (Object.hasOwn(e, "message")) {
                const message = (e as any).message;
                if (message !== undefined) {
                    reconnectReason = message;
                } else {
                    reconnectReason = "connection closed";
                }
            } else {
                reconnectReason = "server closed the connection";
            }

            this.reconnect(reconnectReason);
        });

        eventSource.addEventListener("connected", (e) => {
            const body = JSON.parse(e.data) as ConnectedStreamEvent;

            this.connectionId = body.connectionId;
            this.initialLastEventId = body.lastEventId;

            this.emit("connected", body);

            const startEventId = this.state.getLastEventId() || "0-0";
            if (this.compareEventIds(startEventId, this.initialLastEventId) === -1) {
                this.ready = true;
                this.emit("ready", {});
            }
        });

        const handleEvent = (event: MessageEvent) => {
            const updateType = event.type;
            if (!isValidUpdateType(updateType)) {
                this.emit("error", new Error(`invalid update type: ${updateType}`));
                return;
            }

            this.eventQueue.push({
                lastEventId: event.lastEventId,
                updateType: updateType,
                body: JSON.parse(event.data),
            });
        };

        eventSource.addEventListener("heartbeat", handleEvent);
        eventSource.addEventListener("create", handleEvent);
        eventSource.addEventListener("update", handleEvent);
        eventSource.addEventListener("delete", handleEvent);
        eventSource.addEventListener("merge", handleEvent);

        this.eventSource = eventSource;
    }

    private async startEventWorker() {
        while (!this.signal?.aborted) {
            if (this.eventQueue.size === 0) {
                await sleep(10, this.signal);
                continue;
            }

            const event = this.eventQueue.popLeft();

            await this.state.commitChange(event, this.ready);

            switch (event.updateType) {
                case "create":
                    this.emit("create", {
                        data: event.body.data,
                        origin: event.body.origin,
                        message: event.body.message,
                    });
                    break;
                case "update":
                    this.emit("update", {
                        data: event.body.data,
                        origin: event.body.origin,
                        message: event.body.message,
                        context: event.body.context,
                    });
                    break;
                case "delete":
                    this.emit("delete", {
                        data: event.body.data,
                        origin: event.body.origin,
                        message: event.body.message,
                    });
                    break;
                case "merge":
                    this.emit("merge", event.body);
                    break;
            }

            if (!this.ready) {
                if (this.compareEventIds(event.lastEventId, this.initialLastEventId!) === -1) {
                    this.ready = true;
                    this.emit("ready", {});
                }
            }
        }
    }

    private constructStreamUrl(): string {
        const lastEventId = this.state.getLastEventId() || "0-0";

        const streamUrl = new URL(this.stream);

        streamUrl.search = "";

        streamUrl.searchParams.set("from", lastEventId);
        streamUrl.searchParams.set("no-dependencies", this.noDependencies ? "true" : "false");
        streamUrl.searchParams.set("listen-delete", this.noDelete ? "false" : "true");
        streamUrl.searchParams.set("with-inferences", this.withInferences ? "true" : "false");

        if (lastEventId === "0-0") {
            // if we're starting fresh, use recovery to speed things up
            streamUrl.searchParams.set("recover", new Date().toISOString());
        }

        return streamUrl.toString();
    }

    private compareEventIds(a: string, b: string): -1 | 0 | 1 {
        const [aTimeStr, aSeqStr] = a.split("-");
        const [bTimeStr, bSeqStr] = b.split("-");

        const aTime = parseInt(aTimeStr);
        const bTime = parseInt(bTimeStr);

        if (aTime > bTime) return -1;
        if (aTime < bTime) return 1;

        const aSeq = parseInt(aSeqStr);
        const bSeq = parseInt(bSeqStr);

        if (aSeq > bSeq) return -1;
        if (aSeq < bSeq) return 1;

        return 0;
    }
}
