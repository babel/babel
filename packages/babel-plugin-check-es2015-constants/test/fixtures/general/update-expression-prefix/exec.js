assert.throws(function() {
  const a = "str";
  --a;
}, '"a" is read-only');
