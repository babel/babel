// Options: --block-binding

{
  function f() {
    return f;
  }
  var g = f;
  f = 42;
  expect(g()).toBe(42);
}
