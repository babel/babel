function* f() {
  yield this;
}

var o = {};
for (var x of f.call(o)) {
  assert.equal(o, x);
}
