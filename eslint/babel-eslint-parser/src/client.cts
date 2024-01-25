import type { Options } from "./types.cts";

import path = require("path");

export const enum ACTIONS {
  GET_VERSION = "GET_VERSION",
  GET_TYPES_INFO = "GET_TYPES_INFO",
  GET_VISITOR_KEYS = "GET_VISITOR_KEYS",
  GET_TOKEN_LABELS = "GET_TOKEN_LABELS",
  MAYBE_PARSE = "MAYBE_PARSE",
  MAYBE_PARSE_SYNC = "MAYBE_PARSE_SYNC",
}

export class Client {
  #send;

  constructor(send: Function) {
    this.#send = send;
  }

  #vCache: string;
  getVersion() {
    return (this.#vCache ??= this.#send(ACTIONS.GET_VERSION, undefined));
  }

  #tiCache: any;
  getTypesInfo() {
    return (this.#tiCache ??= this.#send(ACTIONS.GET_TYPES_INFO, undefined));
  }

  #vkCache: any;
  getVisitorKeys() {
    return (this.#vkCache ??= this.#send(ACTIONS.GET_VISITOR_KEYS, undefined));
  }

  #tlCache: any;
  getTokLabels() {
    return (this.#tlCache ??= this.#send(ACTIONS.GET_TOKEN_LABELS, undefined));
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
  static #worker_threads_cache: typeof import("worker_threads");
  static get #worker_threads() {
    return (WorkerClient.#worker_threads_cache ??= require("worker_threads"));
  }

  #worker = new WorkerClient.#worker_threads.Worker(
    path.resolve(__dirname, "../lib/worker/index.cjs"),
    { env: WorkerClient.#worker_threads.SHARE_ENV },
  );

  constructor() {
    super((action: ACTIONS, payload: any) => {
      // We create a new SharedArrayBuffer every time rather than reusing
      // the same one, otherwise sometimes its contents get corrupted and
      // Atomics.wait wakes up too early.
      // https://github.com/babel/babel/pull/14541
      const signal = new Int32Array(new SharedArrayBuffer(8));

      const subChannel = new WorkerClient.#worker_threads.MessageChannel();

      this.#worker.postMessage(
        { signal, port: subChannel.port1, action, payload },
        [subChannel.port1],
      );

      Atomics.wait(signal, 0, 0);
      const { message } = WorkerClient.#worker_threads.receiveMessageOnPort(
        subChannel.port2,
      );

      if (message.error) throw Object.assign(message.error, message.errorData);
      else return message.result;
    });

    // The worker will never exit by itself. Prevent it from keeping
    // the main process alive.
    this.#worker.unref();
  }
}

if (!USE_ESM) {
  exports.LocalClient = class LocalClient extends Client {
    static #handleMessage: Function;

    constructor() {
      LocalClient.#handleMessage ??= require("./worker/handle-message.cjs");

      super((action: ACTIONS, payload: any) => {
        return LocalClient.#handleMessage(
          action === ACTIONS.MAYBE_PARSE ? ACTIONS.MAYBE_PARSE_SYNC : action,
          payload,
        );
      });
    }
  };
}
