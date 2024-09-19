export const sleep = async (ms: number, signal?: AbortSignal): Promise<void> => {
    if (signal?.aborted) return Promise.resolve();

    return new Promise((resolve) => {
        const stop = () => {
            clearTimeout(handle);
            done();
        };

        const done = () => {
            resolve();
            signal?.removeEventListener("abort", stop);
        };

        signal?.addEventListener("abort", stop);

        const handle = setTimeout(() => done(), ms);
    });
};
