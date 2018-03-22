function destructArray() {
  var a, b, c, d;
  [a, [b], c, d] = ['hello', [',', 'junk'], ['world']];
  return {
    a: a,
    b: b,
    c: c,
    d: d
  };
}

// ----------------------------------------------------------------------------

var result = destructArray();
expect(result.a).toBe('hello');
expect(result.b).toBe(',');
expect(result.c).toEqual(['world']);;
expect(result.d).toBeUndefined();

function testNested() {
  var a;
  [[a] = ['b']] = [];
  return a;
}
expect(testNested()).toBe('b');
