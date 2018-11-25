expect(function() {
  const a = 3;
  a = 7;
}).toThrow('"a" is read-only');
