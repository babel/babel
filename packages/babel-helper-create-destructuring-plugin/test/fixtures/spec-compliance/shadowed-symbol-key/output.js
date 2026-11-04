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
    _Symbol$for = babelHelpers.toPropertyKey(Symbol.for("key")),
    a = _a$b[_Symbol$for],
    rest = babelHelpers.objectWithoutProperties(_a$b, [_Symbol$for]);
  return [a, rest];
}
