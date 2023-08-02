define(["require"], function (_require) {
  (specifier => new Promise((_resolve, _reject) => _require([`${specifier}`], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject)))(2);
});
