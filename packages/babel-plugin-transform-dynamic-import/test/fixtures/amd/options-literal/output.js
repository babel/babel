define(["require"], function (_require) {
  sideEffect(), new Promise((_resolve, _reject) => _require(["a"], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject));
});
