function* f() {
  yield [arguments[0], arguments[1]];
}

for (var arr of f(1, 2)) {
  assert.equal(1, arr[0]);
  assert.equal(2, arr[1]);
}