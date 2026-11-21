var _source, _key;
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
_source = source, babelHelpers.objectDestructuringEmpty(_source), _key = babelHelpers.toPropertyKey(key), target().x = _source[_key], _source;
