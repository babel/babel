assert.throws(function() {
  const foo = 1;
  foo++;
}, '"foo" is read-only');
