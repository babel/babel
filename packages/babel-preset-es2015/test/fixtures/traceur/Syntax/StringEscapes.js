var o1 = {
  '\\\'': 42,
  '\0\b\f\n\r\t\v\x42\u1234': 1234
};
var o2 = {
  '\\\'\
': 42,
  '\0\b\f\n\r\t\v\x42\u1234': 1234
};

expect(Object.keys(o2)).toEqual(Object.keys(o1));
expect(o1['\\\'']).toBe(42);
expect(o2['\\\'']).toBe(42);
