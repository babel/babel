function f() {
  var args = (() => arguments)();
  expect(args).toBe(arguments);
}

f();
