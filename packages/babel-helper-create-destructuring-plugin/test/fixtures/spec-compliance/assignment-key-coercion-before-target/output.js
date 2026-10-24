const log = [];
const key = {
  [Symbol.toPrimitive]() {
    log.push("key");
    return "a";
  }
};
const source = {
  a: 1
};
const target = () => (log.push("target"), {});
var _source = source;
babelHelpers.objectDestructuringEmpty(_source);
var _babelHelpers$toPrope = babelHelpers.toPropertyKey(key);
target().x = _source[_babelHelpers$toPrope];
_source;
