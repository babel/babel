function f(_ref, _ref2, _ref3) {
  let [{ a }, { b }, { c = "" }] = [_ref, _ref2, _ref3];
  return [a, b, c];
}
function g(_ref4, ..._ref5) {
  let [{ a }, { b } = { b: 2 }] = [_ref4, ..._ref5];
  return [a, b];
}
function h(_ref6, ..._ref7) {
  let [{ a }, { b } = { b: 2 }, c] = [_ref6, ..._ref7];
  return [a, b, c];
}
function i(_ref8, _ref9, c, ..._ref10) {
  let [{ a }, { b }, ...rest] = [_ref8, _ref9, ..._ref10];
  return [a, b, c, rest];
}

assert.equal(f.length, 3);
assert.equal(g.length, 1);
assert.equal(h.length, 1);
assert.equal(i.length, 3);