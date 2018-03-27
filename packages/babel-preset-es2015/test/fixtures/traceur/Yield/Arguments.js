function* f() {
  yield [arguments[0], arguments[1]];
}

for (var arr of f(1, 2)) {
  expect(arr[0]).toBe(1);
  expect(arr[1]).toBe(2);
}
