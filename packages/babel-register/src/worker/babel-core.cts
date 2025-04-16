"use strict";

if (!process.env.BABEL_8_BREAKING) {
  // eslint-disable-next-line no-var
  var cache = require("./cache-babel-7.cjs");
}

function initialize(babel: typeof import("@babel/core")) {
  exports.init = null;
  exports.version = babel.version;
  exports.DEFAULT_EXTENSIONS = babel.DEFAULT_EXTENSIONS;
  exports.loadOptionsAsync = babel.loadOptionsAsync;
  exports.transformAsync = babel.transformAsync;
  exports.getEnv = babel.getEnv;

  if (!process.env.BABEL_8_BREAKING) {
    // @ts-expect-error Babel 7
    exports.OptionManager = babel.OptionManager;
    exports.transformSync = babel.transformSync;

    cache.initializeCacheFilename();
  }
}

if (USE_ESM) {
  exports.init = (async function () {
    await import("@babel/core").then(initialize);
    if (process.env.BABEL_8_BREAKING) {
      exports.cache = new (await import("./cache.mjs")).default();
    }
  })();
} else {
  initialize(require("@babel/core"));
}
