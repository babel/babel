define(["require"], function (_require) {
  new Promise(r => r(`${2}`)).then(s => new Promise((_resolve, _reject) => _require([s], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject)));
});
