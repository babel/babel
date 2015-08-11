// Can no longer extend objects.
assert.throw(function() {
  class C extends {} {}
}, TypeError);
