export = exports as typeof import("@babel/core") & {
  init: Promise<void> | null;
};

function initialize(babel: typeof import("@babel/core")) {
  exports.init = null;
  exports.version = babel.version;
  exports.traverse = babel.traverse;
  exports.types = babel.types;
  exports.tokTypes = babel.tokTypes;
  exports.parseSync = babel.parseSync;
  exports.loadPartialConfigSync = babel.loadPartialConfigSync;
  exports.loadPartialConfigAsync = babel.loadPartialConfigAsync;
  if (process.env.BABEL_8_BREAKING) {
    exports.createConfigItemSync = babel.createConfigItemSync;
  } else {
    // babel.createConfigItemSync is available on 7.13+
    // we support Babel 7.11+
    exports.createConfigItemSync =
      babel.createConfigItemSync || babel.createConfigItem;
  }
}

if (USE_ESM) {
  exports.init = import("@babel/core").then(initialize);
} else {
  initialize(require("@babel/core"));
}
