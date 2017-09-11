assert.throws(function() {
  const [a, b] = [1, 2];
  a = 3;
}, '"a" is read-only')

assert.throws(function() {
  const a = 1;
  [a] = [2];
}, '"a" is read-only');

assert.throws(function() {
  const b = 1;
  ({b} = {b: 2});
}, '"b" is read-only');
