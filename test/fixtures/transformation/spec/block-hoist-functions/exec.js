function f() { return 1; }
{
  function f() { return 2; }
}
assert.equal(f(), 1);
