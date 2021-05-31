function initialize(babel) {
  exports.init = null;
  exports.version = babel.version;
  exports.traverse = babel.traverse;
  exports.types = babel.types;
  exports.tokTypes = babel.tokTypes;
  exports.parseSync = babel.parseSync;
  exports.loadPartialConfigSync = babel.loadPartialConfigSync;
  exports.loadPartialConfigAsync = babel.loadPartialConfigAsync;
  exports.createConfigItem = babel.createConfigItem;
}

if (process.env.BABEL_8_BREAKING) {
  exports.init = import("@babel/core").then(ns => initialize(ns.default));
} else {
  initialize(require("@babel/core"));
}
