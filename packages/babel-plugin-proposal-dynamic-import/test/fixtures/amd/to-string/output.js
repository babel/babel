define(["require"], function (_require) {
  (source => new Promise(r => r("" + source)).then(s => new Promise((_resolve, _reject) => _require([s], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject))))(2);
});
