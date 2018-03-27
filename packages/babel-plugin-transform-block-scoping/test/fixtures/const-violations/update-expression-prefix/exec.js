expect(function() {
  const a = "str";
  --a;
}).toThrow('"a" is read-only');
