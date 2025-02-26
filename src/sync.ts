// https://github.com/OpenCTI-Platform/client-python/blob/master/pycti/connector/opencti_connector_helper.py

import { Deque } from "@blakeembrey/deque";
import { Identifier, StixObject, StixObjectType, StixObjectTypeMap } from "@security-alliance/stix/2.1";
import EventEmitter from "events";
import { ErrorEvent, EventSource, EventSourceFetchInit } from "eventsource";
import { Operation } from "fast-json-patch";
import { readFile, rename, writeFile } from "fs/promises";
import { sleep } from "./utils.js";

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

const compareEventIds = (a: string, b: string): -1 | 0 | 1 => {
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
};

export interface OpenCTIStreamStateManager {
    initialize(): Promise<void>;

    getLastEventId(): string;
    getRecoverUntil(): string;

    getObjects(): Record<Identifier, StixObject>;
    getObject<T extends StixObjectType>(id: Identifier<T>): StixObjectTypeMap[T] | undefined;

    commitChanges(events: StateUpdateEvent[]): Promise<void>;
}

export class InMemoryOpenCTIStreamStateManager implements OpenCTIStreamStateManager {
    protected lastEventId: string;
    protected recoverUntil: string;
    protected objects: Record<Identifier, StixObject>;

    constructor() {
        this.lastEventId = "0-0";
        this.recoverUntil = new Date().toISOString();
        this.objects = {};
    }

    async initialize(): Promise<void> {}

    getLastEventId(): string {
        return this.lastEventId;
    }

    getRecoverUntil(): string {
        return this.recoverUntil;
    }

    getObjects(): Record<string, StixObject> {
        return this.objects;
    }

    getObject<T extends StixObjectType>(id: Identifier<T>): StixObjectTypeMap[T] | undefined {
        return this.objects[id] as StixObjectTypeMap[T];
    }

    async commitChanges(events: StateUpdateEvent[]): Promise<void> {
        if (events.length === 0) return;

        for (const event of events) {
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
        }

        this.lastEventId = events[events.length - 1].lastEventId;
    }
}

export class FilesystemOpenCTIStreamStateManager extends InMemoryOpenCTIStreamStateManager {
    private path: string;
    private commitFrequency: number;

    private committing = false;
    private changes = 0;
    private lastCommittedTime = Date.now();

    constructor(path: string, commitFrequency?: number) {
        super();

        this.path = path;
        this.commitFrequency = commitFrequency || 1000 * 60;
    }

    async initialize(): Promise<void> {
        try {
            const data = JSON.parse(await readFile(this.path, "utf-8"));

            this.lastEventId = data["lastEventId"];
            this.recoverUntil = data["recoverUntil"];
            this.objects = data["objects"];
        } catch (e: any) {
            if (e.code !== "ENOENT") {
                throw e;
            }
        }
    }

    async commitChanges(events: StateUpdateEvent[]): Promise<void> {
        if (Date.now() - this.lastCommittedTime > this.commitFrequency && this.changes > 0 && !this.committing) {
            try {
                this.committing = true;
                this.changes = 0;

                const payload = {
                    lastEventId: this.lastEventId,
                    recoverUntil: this.recoverUntil,
                    objects: this.objects,
                };

                const tempFile = `${this.path}.tmp`;
                await writeFile(tempFile, JSON.stringify(payload, undefined, 2), "utf-8");
                await rename(tempFile, this.path);

                this.lastCommittedTime = Date.now();
            } finally {
                this.committing = false;
            }
        }

        super.commitChanges(events);
        this.changes += events.length;
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

export class OpenCTIStream extends EventEmitter<{
    create: [CreateStreamEvent];
    update: [UpdateStreamEvent];
    delete: [DeleteStreamEvent];
    merge: [MergeStreamEvent];
    connected: [ConnectedStreamEvent];

    ready: [];
    error: [ErrorEvent];
    closed: [];
}> {
    stream: URL;
    noDependencies: boolean;
    noDelete: boolean;
    withInferences: boolean;
    authorization: string | undefined;

    state: OpenCTIStreamStateManager;

    signal: AbortSignal | undefined;

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
            this.stop();
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
        // if already started, abort
        if (this.started) return;
        this.started = true;

        // initialize, this should only happen once
        await this.state.initialize();

        // the signal could have aborted in the meantime, check
        if (this.signal?.aborted) return;

        const eventSource = new EventSource(new URL("invalid://"), {
            fetch: async (_: string | URL, init: EventSourceFetchInit) => {
                if (this.authorization) {
                    init.headers["authorization"] = `Bearer ${this.authorization}`;
                }

                return fetch(this.constructStreamUrl(), init);
            },
        });

        eventSource.addEventListener("error", (e) => {
            this.emit("error", e);
        });

        eventSource.addEventListener("connected", (e) => {
            const body = JSON.parse(e.data) as ConnectedStreamEvent;

            this.connectionId = body.connectionId;
            this.initialLastEventId = body.lastEventId;

            this.emit("connected", body);

            this.tryMarkReady(this.state.getLastEventId());
        });

        const handleEvent = (event: MessageEvent) => {
            const updateType = event.type;
            if (!isValidUpdateType(updateType)) {
                this.emit("error", new ErrorEvent("error", { message: `invalid update type: ${updateType}` }));
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

        this.livenessChecker = setInterval(() => {
            if (eventSource.readyState !== EventSource.CLOSED) return;

            this.emit("error", new ErrorEvent("error", { message: "liveness checker detected closed event source" }));

            this.stop();
        }, 1000 * 60);
    }

    private stop() {
        clearInterval(this.livenessChecker);
        this.eventSource?.close();
        this.emit("closed");
    }

    private async startEventWorker() {
        while (!this.signal?.aborted) {
            if (this.eventQueue.size === 0) {
                await sleep(10, this.signal);
                continue;
            }

            const events = Array.from(this.eventQueue.entries());
            this.eventQueue.clear();

            try {
                await this.state.commitChanges(events);
            } catch (e: any) {
                this.emit("error", new ErrorEvent("error", { message: `failed to commit changes: ${e.toString()}` }));
                this.stop();
                return;
            }

            for (const event of events) {
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
            }

            const latestEvent = events[events.length - 1];
            this.tryMarkReady(latestEvent.lastEventId);
        }
    }

    private constructStreamUrl(): string {
        const lastEventId = this.state.getLastEventId();

        const streamUrl = new URL(this.stream);

        streamUrl.search = "";
        streamUrl.searchParams.set("from", lastEventId);
        streamUrl.searchParams.set("no-dependencies", this.noDependencies ? "true" : "false");
        streamUrl.searchParams.set("listen-delete", this.noDelete ? "false" : "true");
        streamUrl.searchParams.set("with-inferences", this.withInferences ? "true" : "false");
        streamUrl.searchParams.set("recover", this.state.getRecoverUntil());

        return streamUrl.toString();
    }

    private tryMarkReady(lastEventId: string) {
        if (this.ready) return;

        if (compareEventIds(lastEventId, this.initialLastEventId!) !== -1) return;

        this.ready = true;
        this.emit("ready");
    }
}
