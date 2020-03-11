function foo(a = 2) {
  for (let a, i = 0; i < 1; i++) a = 1;
  expect(a).toBe(2);
}
foo();
