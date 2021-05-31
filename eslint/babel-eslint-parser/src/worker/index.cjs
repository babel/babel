const babel = require("./babel-core.cjs");
const maybeParse = require("./maybeParse.cjs");
const { getVisitorKeys, getTokLabels } = require("./ast-info.cjs");
const normalizeBabelParseConfig = require("./configuration.cjs");

function handleMessage(action, payload) {
  switch (action) {
    case "GET_VERSION":
      return babel.version;
    case "GET_TYPES_INFO":
      return {
        FLOW_FLIPPED_ALIAS_KEYS: babel.types.FLIPPED_ALIAS_KEYS.Flow,
        VISITOR_KEYS: babel.types.VISITOR_KEYS,
      };
    case "GET_TOKEN_LABELS":
      return getTokLabels();
    case "GET_VISITOR_KEYS":
      return getVisitorKeys();
    case "MAYBE_PARSE":
      if (process.env.BABEL_8_BREAKING) {
        return normalizeBabelParseConfig(payload.options).then(options =>
          maybeParse(payload.code, options),
        );
      } else {
        return maybeParse(
          payload.code,
          normalizeBabelParseConfig(payload.options),
        );
      }
  }

  throw new Error(`Unknown internal parser worker action: ${action}`);
}

if (process.env.BABEL_8_BREAKING) {
  const { parentPort } = require("worker_threads");

  parentPort.addListener(
    "message",
    async ({ signal, port, action, payload }) => {
      let response;

      try {
        if (babel.init) await babel.init;

        response = { result: await handleMessage(action, payload) };
      } catch (error) {
        response = { error, errorData: { ...error } };
      }

      try {
        port.postMessage(response);
      } catch {
        port.postMessage({
          error: new Error("Cannot serialize worker response"),
        });
      } finally {
        port.close();
        Atomics.store(signal, 0, 1);
        Atomics.notify(signal, 0);
      }
    },
  );
} else {
  module.exports = handleMessage;
}
