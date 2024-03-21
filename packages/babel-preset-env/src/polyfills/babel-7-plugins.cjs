// TODO(Babel 8): Remove this file

if (!process.env.BABEL_8_BREAKING) {
  Object.defineProperties(exports, {
    pluginCoreJS2: {
      get: () => require("babel-plugin-polyfill-corejs2").default,
    },
    pluginRegenerator: {
      get: () => require("babel-plugin-polyfill-regenerator").default,
    },
    legacyBabelPolyfillPlugin: { get: () => require("./babel-polyfill.cjs") },
    removeRegeneratorEntryPlugin: { get: () => require("./regenerator.cjs") },
    corejs2Polyfills: {
      get: () => require("@babel/compat-data/corejs2-built-ins"),
    },
  });
}
