assert.throws(function() {
  const a = {
    b() {}
  }
  new a.b();

}, 'Cannot instantiate a method');
