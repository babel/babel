assert.throws(function() {
  const a = 3;
  a = 7;
}, '"a" is read-only');
