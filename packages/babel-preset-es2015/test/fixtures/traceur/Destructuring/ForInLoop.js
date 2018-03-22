// Options: --block-binding

var object = {
  abc: 0,  // Keep all the keys at length 3.
  def: 1
};

var expectedHeads = ['a', 'd'];
var expectedTails = [['b', 'c'], ['e','f']];
var i = 0;
for (var [head, ...tail] in object) {
  expect(expectedHeads[i]).toBe(head);
  expect(tail).toEqual(expectedTails[i]);;
  i++;
}
expect(2).toBe(i);

{
  let x = 42;
  for (let {length: x} in object) {
    expect(3).toBe(x);
  }
  expect(42).toBe(x);
}

var k;
for ({length: k} in {abc: 3})  // No block
  expect(3).toBe(k);
