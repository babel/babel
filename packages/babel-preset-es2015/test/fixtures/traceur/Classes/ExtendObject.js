// Can no longer extend objects.
expect(function() {
  class C extends {} {}
}).toThrow(TypeError);
