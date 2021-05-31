function foo(a = 2) {
  for (var i of [0]) var a;
  expect(a).toBe(2);
}
foo();
