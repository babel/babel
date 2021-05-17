const path = require("path");

let send;

exports.getVersion = sendCached("GET_VERSION");

exports.getTypesInfo = sendCached("GET_TYPES_INFO");

exports.getVisitorKeys = sendCached("GET_VISITOR_KEYS");

exports.getTokLabels = sendCached("GET_TOKEN_LABELS");

exports.maybeParse = (code, options) => send("MAYBE_PARSE", { code, options });

function sendCached(action) {
  let cache = null;

  return () => {
    if (!cache) cache = send(action, undefined);
    return cache;
  };
}

if (process.env.BABEL_8_BREAKING) {
  const {
    Worker,
    receiveMessageOnPort,
    MessageChannel,
    SHARE_ENV,
  } = require("worker_threads");

  // We need to run Babel in a worker for two reasons:
  // 1. ESLint workers must be CJS files, and this is a problem
  //    since Babel 8+ uses native ESM
  // 2. ESLint parsers must run synchronously, but many steps
  //    of Babel's config loading (which is done for each file)
  //    can be asynchronous
  // If ESLint starts supporting async parsers, we can move
  // everything back to the main thread.
  const worker = new Worker(
    path.resolve(__dirname, "../lib/worker/index.cjs"),
    { env: SHARE_ENV },
  );

  // The worker will never exit by itself. Prevent it from keeping
  // the main process alive.
  worker.unref();

  const signal = new Int32Array(new SharedArrayBuffer(4));

  send = (action, payload) => {
    signal[0] = 0;
    const subChannel = new MessageChannel();

    worker.postMessage({ signal, port: subChannel.port1, action, payload }, [
      subChannel.port1,
    ]);

    Atomics.wait(signal, 0, 0);
    const { message } = receiveMessageOnPort(subChannel.port2);

    if (message.error) throw Object.assign(message.error, message.errorData);
    else return message.result;
  };
} else {
  send = require("./worker/index.cjs");
}
