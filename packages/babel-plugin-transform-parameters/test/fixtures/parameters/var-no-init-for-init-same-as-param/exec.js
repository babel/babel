function foo(a = 2) {
  for (var a, i = 0; i < 1; i++);
  expect(a).toBe(2);
}
foo();
