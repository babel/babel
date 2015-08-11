function f() {
  return /*
      */ 1;
}
assert.equal(undefined, f());

function g() {
  return /* */ 1;
}
assert.equal(1, g());

function h() {
  return /* */ /*
      */ 1;
}
assert.equal(undefined, h());

function i() {
  return /* */ //
      1;
}
assert.equal(undefined, i());

function j() {
  return //
      1;
}
assert.equal(undefined, j());
