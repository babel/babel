"use strict";

const sourceMapSupport = require("source-map-support");
const clients = require("./worker-client");

const maps = Object.create(null);

function installSourceMapSupport() {
  installSourceMapSupport = () => {}; // eslint-disable-line no-func-assign

  sourceMapSupport.install({
    handleUncaughtExceptions: false,
    environment: "node",
    retrieveSourceMap(filename) {
      const map = maps?.[filename];
      if (map) {
        return { url: null, map: map };
      } else {
        return null;
      }
    },
  });
}

if (!process.env.BABEL_8_BREAKING) {
  // Babel 7 compiles files in the same thread where it hooks `require()`,
  // so we must prevent mixing Babel plugin dependencies with the files
  // to be compiled.
  // All the `!process.env.BABEL_8_BREAKING` code in this file is for
  // this purpose.

  const Module = require("module");

  let compiling = false;
  const internalModuleCache = Module._cache;

  // eslint-disable-next-line no-var
  var compileBabel7 = function compileBabel7(client, code, filename, esm) {
    if (!client.isLocalClient) return compile(client, code, filename, esm);

    if (compiling) return code;

    const globalModuleCache = Module._cache;
    try {
      compiling = true;
      Module._cache = internalModuleCache;
      return compile(client, code, filename);
    } finally {
      compiling = false;
      Module._cache = globalModuleCache;
    }
  };
}

function compile(client, inputCode, filename, esm) {
  const result = client.transform(inputCode, filename);

  if (result === null) return esm ? null : inputCode;

  const { code, map, sourceType } = result;
  if (map) {
    maps[filename] = map;
    installSourceMapSupport();
  }

  if (esm) {
    return {
      source: code,
      format: sourceType,
      shortCircuit: true,
    };
  }

  return code;
}

let clientType;
let clientInstance;

module.exports = function setup(client, opts) {
  if (clientType !== client) {
    const Class = clients[client];
    clientInstance = new Class();
    clientType = client;
  }

  clientInstance.setOptions(opts);

  return {
    compile: (process.env.BABEL_8_BREAKING ? compile : compileBabel7).bind(
      null,
      clientInstance,
    ),
    client: clientInstance,
  };
};
