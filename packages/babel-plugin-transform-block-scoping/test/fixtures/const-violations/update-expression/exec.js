expect(function() {
  const foo = 1;
  foo++;
}).toThrow('"foo" is read-only');
