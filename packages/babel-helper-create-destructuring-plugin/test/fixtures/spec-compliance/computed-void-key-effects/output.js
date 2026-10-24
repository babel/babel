var _b = {
  b: 1
};
babelHelpers.toPropertyKey((log.push("key"), "a"));
var b = _b.b;
babelHelpers.objectDestructuringEmpty(source);
babelHelpers.toPropertyKey(key);
babelHelpers.objectDestructuringEmpty(source);
babelHelpers.toPropertyKey({
  toString() {
    log.push("toString");
    return "a";
  }
});
var _source = source;
babelHelpers.objectDestructuringEmpty(_source);
var _babelHelpers$toPrope = babelHelpers.toPropertyKey(key),
  rest = babelHelpers.objectWithoutProperties(_source, [_babelHelpers$toPrope]);
const c = source.c;
