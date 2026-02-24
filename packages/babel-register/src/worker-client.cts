import type { IClient, Options } from "./types.cts";
import types = require("./types.cts");
import ACTIONS = types.ACTIONS;

import worker_threads = require("node:worker_threads");
import path = require("node:path");

const { markInRegisterWorker } = require("./is-in-register-worker.cjs");

class Client implements IClient {
  #send;

  constructor(send: (action: ACTIONS, payload: any) => any) {
    this.#send = send;
  }

  #eCache: string[];
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

  close() {
    this.#send(ACTIONS.CLOSE, undefined);
  }
}

// We need to run Babel in a worker because require hooks must
// run synchronously, but many steps of Babel's config loading
// (which is done for each file) can be asynchronous
class WorkerClient extends Client {
  #worker = new worker_threads.Worker(
    path.resolve(__dirname, "./worker/index.mjs"),
    { env: markInRegisterWorker(process.env) },
  );

  #signal = new Int32Array(new SharedArrayBuffer(4));

  constructor() {
    super((action, payload) => {
      this.#signal[0] = 0;
      const subChannel = new worker_threads.MessageChannel();

      this.#worker.postMessage(
        { signal: this.#signal, port: subChannel.port1, action, payload },
        [subChannel.port1],
      );

      Atomics.wait(this.#signal, 0, 0);
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

export = { WorkerClient };
