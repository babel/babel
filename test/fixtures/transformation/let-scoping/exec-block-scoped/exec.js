let x = 1;
{
  let x = 2;
  assert.equal(x, 2);
}
assert.equal(x, 1);
