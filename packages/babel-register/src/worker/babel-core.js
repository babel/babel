function initialize(babel) {
  exports.init = null;
  exports.version = babel.version;
  exports.DEFAULT_EXTENSIONS = babel.DEFAULT_EXTENSIONS;
  exports.loadOptionsAsync = babel.loadOptionsAsync;
  exports.transformAsync = babel.transformAsync;
  exports.getEnv = babel.getEnv;

  if (!process.env.BABEL_8_BREAKING) {
    exports.loadOptionsSync = babel.loadOptionsSync;
    exports.transformSync = babel.transformSync;
  }
}

if (process.env.BABEL_8_BREAKING) {
  // @ts-expect-error CJS-ESM interop.
  exports.init = import("@babel/core").then(ns => initialize(ns.default));
} else {
  initialize(require("@babel/core"));
}
