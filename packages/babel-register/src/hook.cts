import type { IClient, Options } from "./types.cts";

import pirates = require("pirates");
const sourceMapSupport: typeof import("@cspotcode/source-map-support") = require("@cspotcode/source-map-support");
let piratesRevert: () => void;
const maps = Object.create(null);

function installSourceMapSupport() {
  // @ts-expect-error assign to function
  installSourceMapSupport = () => {};

  sourceMapSupport.install({
    handleUncaughtExceptions: false,
    environment: "node",
    retrieveSourceMap(filename: string) {
      const map = maps?.[filename];
      if (map) {
        return { url: null, map: map };
      } else {
        return null;
      }
    },
  });
}

function compile(client: IClient, inputCode: string, filename: string) {
  const result = client.transform(inputCode, filename);

  if (result === null) return inputCode;

  const { code, map } = result;
  if (map) {
    maps[filename] = map;
    installSourceMapSupport();
  }
  return code;
}

function register(client: IClient, opts: Options = {}) {
  if (piratesRevert) piratesRevert();

  piratesRevert = pirates.addHook(compile.bind(null, client), {
    exts: opts.extensions ?? client.getDefaultExtensions(),
    ignoreNodeModules: false,
  });

  client.setOptions(opts);
}

function revert() {
  if (piratesRevert) piratesRevert();
}

export = { register, revert };
