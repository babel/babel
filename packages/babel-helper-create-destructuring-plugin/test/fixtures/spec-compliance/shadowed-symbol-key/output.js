const log = [];
const key = {
  [globalThis.Symbol.toPrimitive]() {
    log.push("key");
    return "a";
  }
};
function read(Symbol) {
  const _a$b = {
      a: 1,
      b: 2
    },
    _babelHelpers$toPrope = babelHelpers.toPropertyKey(Symbol.for("key")),
    a = _a$b[_babelHelpers$toPrope],
    rest = babelHelpers.objectWithoutProperties(_a$b, [_babelHelpers$toPrope]);
  return [a, rest];
}
