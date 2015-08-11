// Options: --block-binding

{
  let i = 0, called = 0;
  function f() {
    called++;
    return function() {
      return ++i;
    };
  }

  assert.equal(1, f() `whatevs`);
  assert.equal(1, called);
  assert.equal(2, f `abc` `def`);
  assert.equal(2, called);
  assert.equal(3, f `ghi` ());
  assert.equal(3, called);
}
