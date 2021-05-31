function foo(a = 2) {
  for (var i of [0]) var a = 1;
  expect(a).toBe(1);
}
foo();
