assert.throws(function() {
  const a = {
    b() {}
  }
  new a.b();

}, 'Cannot instantiate a method');

assert.doesNotThrow(function() {
  const a = {
    b() {}
  }
  a.b();

});
