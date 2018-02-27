assert.throws(function() {
  const key = 'key';
  const a = {
    [key + 'foo']() {}
  }
  new a[key + 'foo']();
}, 'Cannot instantiate a method');

assert.doesNotThrow(function() {
  const key = 'key';
  const a = {
    [key + 'foo']() {}
  }
  a[key + 'foo']();
});
