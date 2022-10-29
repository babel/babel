let cache;
if (process.env.BABEL_8_BREAKING) {
  cache = require("./cache");
} else if (global.TEST_USE_NEW_CACHE ?? !process.env.BABEL_CACHE_PATH) {
  cache = require("./cache");
} else {
  cache = require("./cache-legacy");
}

function initialize(babel) {
  exports.init = null;
  exports.version = babel.version;
  exports.DEFAULT_EXTENSIONS = babel.DEFAULT_EXTENSIONS;
  exports.loadOptionsAsync = babel.loadOptionsAsync;
  exports.transformAsync = babel.transformAsync;
  exports.getEnv = babel.getEnv;

  if (!process.env.BABEL_8_BREAKING) {
    exports.OptionManager = babel.OptionManager;
    exports.transformSync = babel.transformSync;
  }

  cache.initializeCacheFilename();
}

if (USE_ESM) {
  // @ts-expect-error CJS-ESM interop.
  exports.init = import("@babel/core").then(initialize);
} else {
  initialize(require("@babel/core"));
}
