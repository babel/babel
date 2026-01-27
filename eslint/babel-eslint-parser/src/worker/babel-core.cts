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
  exports.parseAsync = babel.parseAsync;
  exports.loadPartialConfigSync = babel.loadPartialConfigSync;
  exports.loadPartialConfigAsync = babel.loadPartialConfigAsync;
  exports.createConfigItemAsync = babel.createConfigItemAsync;

  exports.createConfigItemSync = babel.createConfigItemSync;
}

exports.init = import("@babel/core").then(initialize).catch(err => {
  throw err;
});
