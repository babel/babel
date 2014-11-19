let x = 1;
{
  let x = 2;
  assert.equal(x, 2);
  {
    let x = 3;
    assert.equal(x, 3);

    x++;
    assert.equal(x, 4);
  }
}
assert.equal(x, 1);
