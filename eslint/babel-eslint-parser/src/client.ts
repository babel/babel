import path from "node:path";
import {
  Worker,
  SHARE_ENV,
  MessageChannel,
  receiveMessageOnPort,
} from "node:worker_threads";

import type { Options } from "./types";

export const enum ACTIONS {
  MAYBE_PARSE = "MAYBE_PARSE",
}

export class Client {
  #send;

  constructor(send: Function) {
    this.#send = send;
  }

  maybeParse(code: string, options: Options) {
    return this.#send(ACTIONS.MAYBE_PARSE, { code, options });
  }
}

// We need to run Babel in a worker for two reasons:
// 1. ESLint workers must be CJS files, and this is a problem
//    since Babel 8+ uses native ESM
// 2. ESLint parsers must run synchronously, but many steps
//    of Babel's config loading (which is done for each file)
//    can be asynchronous
// If ESLint starts supporting async parsers, we can move
// everything back to the main thread.
export class WorkerClient extends Client {
  #worker = new Worker(
    path.resolve(import.meta.dirname, "../lib/worker/index.js"),
    { env: SHARE_ENV },
  );

  constructor() {
    super((action: ACTIONS, payload: any) => {
      // We create a new SharedArrayBuffer every time rather than reusing
      // the same one, otherwise sometimes its contents get corrupted and
      // Atomics.wait wakes up too early.
      // https://github.com/babel/babel/pull/14541
      const signal = new Int32Array(new SharedArrayBuffer(8));

      const subChannel = new MessageChannel();

      this.#worker.postMessage(
        { signal, port: subChannel.port1, action, payload },
        [subChannel.port1],
      );

      Atomics.wait(signal, 0, 0);
      const { message } = receiveMessageOnPort(subChannel.port2);

      if (message.error) throw Object.assign(message.error, message.errorData);
      else return message.result;
    });

    // The worker will never exit by itself. Prevent it from keeping
    // the main process alive.
    this.#worker.unref();
  }
}
