function initialize(babel: typeof import("@babel/core")) {
  exports.init = null;
  exports.version = babel.version;
  exports.DEFAULT_EXTENSIONS = babel.DEFAULT_EXTENSIONS;
  exports.loadOptionsAsync = babel.loadOptionsAsync;
  exports.transformAsync = babel.transformAsync;
  exports.getEnv = babel.getEnv;
}

exports.init = (async function () {
  await import("@babel/core").then(initialize).catch(err => {
    throw err;
  });

  exports.cache = new (await import("./cache.mjs")).default();
})();
