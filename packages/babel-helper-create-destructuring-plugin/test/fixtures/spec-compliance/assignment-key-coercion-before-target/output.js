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
babelHelpers.objectDestructuringEmpty(source);
var _babelHelpers$toPrope = babelHelpers.toPropertyKey(key);
target().x = source[_babelHelpers$toPrope];
source;
