// Options: --block-binding

function* gen() {
  yield new String('abc');
  yield new String('def');
}

var expectedHeads = ['a', 'd'];
var expectedTails = [['b', 'c'], ['e','f']];
var i = 0;
for (var [head, ...tail] of gen()) {
  expect(expectedHeads[i]).toBe(head);
  expect(tail).toEqual(expectedTails[i]);;
  i++;
}
expect(i).toBe(2);

{
  let x = 42;
  for (let {length: x} of gen()) {
    expect(x).toBe(3);
  }
  expect(x).toBe(42);
}

var k;
for ({length: k} of [new String('abc')])  // No block
  expect(k).toBe(3);
