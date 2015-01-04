// Options: --block-binding

var x = 1;
{
  let x;
  assert.equal(undefined, x);
  x = 2;
  assert.equal(2, x);
}
assert.equal(1, x);
