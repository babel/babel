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
assert.equal('hello', result.a);
assert.equal(',', result.b);
assertArrayEquals(['world'], result.c);
assert.isUndefined(result.d);

function testNested() {
  var a;
  [[a] = ['b']] = [];
  return a;
}
assert.equal(testNested(), 'b');
