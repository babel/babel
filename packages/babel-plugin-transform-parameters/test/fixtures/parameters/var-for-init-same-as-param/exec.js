function foo(a = 2) {
  for (var [a] of [[1]]);
  expect(a).toBe(1);
}
foo();
