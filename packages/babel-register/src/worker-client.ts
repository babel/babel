import type { IClient, Options } from "./types.ts";
import { ACTIONS } from "./types.ts";

import worker_threads from "node:worker_threads";

import { markInRegisterWorker } from "./is-in-register-worker.ts";

class Client implements IClient {
  #send;

  constructor(send: (action: ACTIONS, payload: any) => any) {
    this.#send = send;
  }

  #eCache: string[] | undefined;
  getDefaultExtensions(): string[] {
    return (this.#eCache ??= this.#send(
      ACTIONS.GET_DEFAULT_EXTENSIONS,
      undefined,
    ));
  }

  setOptions(options: Options): void {
    return this.#send(ACTIONS.SET_OPTIONS, options);
  }

  transform(
    code: string,
    filename: string,
  ): { code: string; map: object } | null {
    return this.#send(ACTIONS.TRANSFORM, { code, filename });
  }

  isFileIgnored(filename: string): boolean {
    return this.#send(ACTIONS.IS_FILE_IGNORED, filename);
  }

  close() {
    this.#send(ACTIONS.CLOSE, undefined);
  }
}

// We need to run Babel in a worker because require hooks must
// run synchronously, but many steps of Babel's config loading
// (which is done for each file) can be asynchronous
class WorkerClient extends Client {
  #worker = new worker_threads.Worker(
    new URL("./worker/index.js", import.meta.url),
    { env: markInRegisterWorker(process.env) },
  );

  constructor() {
    super((action, payload) => {
      // We create a new SharedArrayBuffer every time rather than reusing
      // the same one, otherwise sometimes its contents get corrupted and
      // Atomics.wait wakes up too early.
      // https://github.com/babel/babel/pull/14541
      const signal = new Int32Array(new SharedArrayBuffer(4));
      const subChannel = new worker_threads.MessageChannel();

      this.#worker.postMessage(
        { signal, port: subChannel.port1, action, payload },
        [subChannel.port1],
      );

      Atomics.wait(signal, 0, 0);
      const { message } = worker_threads.receiveMessageOnPort(
        subChannel.port2,
      )!;

      if (message.error) throw Object.assign(message.error, message.errorData);
      else return message.result;
    });

    // The worker will never exit by itself. Prevent it from keeping
    // the main process alive.
    this.#worker.unref();
  }
}

export { WorkerClient };
