
expect(function() {
  class C extends Math {}
}).toThrow('Super expression must either be null or a function');

expect(function() {
  function f() {}
  // prototype needs to be an Object or null.
  f.prototype = 42;
  class C extends f {}
}).toThrow('Object prototype may only be an Object or null');
