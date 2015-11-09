// Options: --block-binding

var object = {
  abc: 0,  // Keep all the keys at length 3.
  def: 1
};

var expectedHeads = ['a', 'd'];
var expectedTails = [['b', 'c'], ['e','f']];
var i = 0;
for (var [head, ...tail] in object) {
  assert.equal(expectedHeads[i], head);
  assertArrayEquals(expectedTails[i], tail);
  i++;
}
assert.equal(2, i);

{
  let x = 42;
  for (let {length: x} in object) {
    assert.equal(3, x);
  }
  assert.equal(42, x);
}

var k;
for ({length: k} in {abc: 3})  // No block
  assert.equal(3, k);