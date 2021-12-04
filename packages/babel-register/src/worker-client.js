const path = require("path");

const { markInRegisterWorker } = require("./is-in-register-worker");

const ACTIONS = {
  GET_DEFAULT_EXTENSIONS: "GET_DEFAULT_EXTENSIONS",
  SET_OPTIONS: "SET_OPTIONS",
  TRANSFORM: "TRANSFORM",
  TRANSFORM_SYNC: "TRANSFORM_SYNC",
};

class Client {
  #send;

  constructor(send) {
    this.#send = send;
  }

  #eCache;
  /** @return {string[]} */
  getDefaultExtensions() {
    return (this.#eCache ??= this.#send(
      ACTIONS.GET_DEFAULT_EXTENSIONS,
      undefined,
    ));
  }

  /**
   * @param {object} options
   * @return {void}
   */
  setOptions(options) {
    return this.#send(ACTIONS.SET_OPTIONS, options);
  }

  /**
   * @param {string} code
   * @param {string} filename
   * @return {{ code: string, map: object } | null}
   */
  transform(code, filename) {
    return this.#send(ACTIONS.TRANSFORM, { code, filename });
  }
}

// We need to run Babel in a worker because require hooks must
// run synchronously, but many steps of Babel's config loading
// (which is done for each file) can be asynchronous
exports.WorkerClient = class WorkerClient extends Client {
  static #worker_threads_cache;
  /** @type {typeof import("worker_threads")} */
  static get #worker_threads() {
    return (WorkerClient.#worker_threads_cache ??= require("worker_threads"));
  }

  #worker = new WorkerClient.#worker_threads.Worker(
    path.resolve(__dirname, "./worker/index.js"),
    { env: markInRegisterWorker(process.env) },
  );

  #signal = new Int32Array(new SharedArrayBuffer(4));

  constructor() {
    super((action, payload) => {
      this.#signal[0] = 0;
      const subChannel = new WorkerClient.#worker_threads.MessageChannel();

      this.#worker.postMessage(
        { signal: this.#signal, port: subChannel.port1, action, payload },
        [subChannel.port1],
      );

      Atomics.wait(this.#signal, 0, 0);
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
};

if (!process.env.BABEL_8_BREAKING) {
  exports.LocalClient = class LocalClient extends Client {
    isLocalClient = true;

    static #handleMessage;

    constructor() {
      LocalClient.#handleMessage ??= require("./worker/handle-message");

      super((action, payload) => {
        return LocalClient.#handleMessage(
          action === ACTIONS.TRANSFORM ? ACTIONS.TRANSFORM_SYNC : action,
          payload,
        );
      });
    }
  };
}
