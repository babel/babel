// Options: --block-binding

{
  function f() {
    return f;
  }
  var g = f;
  f = 42;
  assert.equal(42, g());
}
