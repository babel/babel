function foo(a = 2) {
  for (var a, i = 0; i < 1; i++);
  expect(a).toBe(undefined);
}
foo();
