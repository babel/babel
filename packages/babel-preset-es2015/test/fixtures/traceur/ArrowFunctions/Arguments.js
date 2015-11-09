function f() {
  var args = (() => arguments)();
  assert.equal(args, arguments);
}

f();
