var Person = (class Person {});
assert.equal(typeof Person, 'function');

assert.equal(
  (function(){ return (class Person {}); })().name,
  'Person'
);

assert.equal(typeof (class {}), 'function');
