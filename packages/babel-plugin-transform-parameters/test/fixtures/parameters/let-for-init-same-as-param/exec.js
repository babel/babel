function foo(a = 2) {
  for (let a = 1; a > 0; a--);
  expect(a).toBe(2);
}
foo();
