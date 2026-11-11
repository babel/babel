define(["require"], function (_require) {
  var a = new Promise((_resolve, _reject) => _require(["a"], imported => _resolve(imported), _reject));
  var b = new Promise((_resolve, _reject) => _require(["b"], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject));
  var c = (specifier => new Promise((_resolve, _reject) => _require([specifier], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject)))(`a`);
  var d = (specifier => new Promise((_resolve, _reject) => _require([`${specifier}`], imported => _resolve(babelHelpers.interopRequireWildcard(imported)), _reject)))(dynamic);
});
