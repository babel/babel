define(["require"], function (_require) {
  new Promise((_resolve, _reject) => _require(["foo"], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject));
});
