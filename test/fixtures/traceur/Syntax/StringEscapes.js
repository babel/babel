var o1 = {
  '\\\'': 42,
  '\0\b\f\n\r\t\v\x42\u1234': 1234
};
var o2 = {
  '\\\'\
': 42,
  '\0\b\f\n\r\t\v\x42\u1234': 1234
};

assertArrayEquals(Object.keys(o1), Object.keys(o2));
assert.equal(42, o1['\\\'']);
assert.equal(42, o2['\\\'']);
