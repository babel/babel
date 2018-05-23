function* f() {
  yield this;
}

var o = {};
for (var x of f.call(o)) {
  expect(o).toBe(x);
}
