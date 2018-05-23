'use strict';

var s = Symbol();
var p = {};
Object.defineProperty(p, s, {
  get: function() {
    return 42;
  },
  configurable: true
});

var o = Object.create(p);
expect(o[s]).toBe(42);
expect(function() {
  o[s] = 1;
}).toThrow(TypeError);

var val;
Object.defineProperty(p, s, {
  set: function(v) {
    val = v;
  },
  configurable: true
});

o[s] = 33;
expect(val).toBe(33);
