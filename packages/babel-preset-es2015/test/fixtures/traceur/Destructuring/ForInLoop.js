// Options: --block-binding

var object = {
  abc: 0,  // Keep all the keys at length 3.
  def: 1
};

var expectedHeads = ['a', 'd'];
var expectedTails = [['b', 'c'], ['e','f']];
var i = 0;
for (var [head, ...tail] in object) {
  expect(head).toBe(expectedHeads[i]);
  expect(tail).toEqual(expectedTails[i]);
  i++;
}
expect(i).toBe(2);

{
  let x = 42;
  for (let {length: x} in object) {
    expect(x).toBe(3);
  }
  expect(x).toBe(42);
}

var k;
for ({length: k} in {abc: 3})  // No block
  expect(k).toBe(3);
