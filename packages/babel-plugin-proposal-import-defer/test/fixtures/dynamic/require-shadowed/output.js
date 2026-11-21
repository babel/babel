function f(_require) {
  return Promise.resolve().then(() => babelHelpers.importDeferProxy(() => babelHelpers.interopRequireWildcard(require("a"))));
}
