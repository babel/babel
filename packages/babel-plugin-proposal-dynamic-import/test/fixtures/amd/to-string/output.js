define(["require"], function (_require) {
  (specifier => new Promise(r => r(`${specifier}`)).then(s => new Promise((_resolve, _reject) => _require([s], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject))))(2);
});
