var _source;
var _b = {
  b: 1
};
babelHelpers.toPropertyKey((log.push("key"), "a"));
var b = _b.b;
babelHelpers.objectDestructuringEmpty(_source = source), babelHelpers.toPropertyKey(key), _source;
babelHelpers.objectDestructuringEmpty(source);
babelHelpers.toPropertyKey({
  toString() {
    log.push("toString");
    return "a";
  }
});
var _source2 = source;
babelHelpers.objectDestructuringEmpty(_source2);
var _key = babelHelpers.toPropertyKey(key),
  rest = babelHelpers.objectWithoutProperties(_source2, [_key]);
const c = source.c;
