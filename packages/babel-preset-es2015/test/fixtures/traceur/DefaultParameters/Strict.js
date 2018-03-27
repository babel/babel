function f(a = 1) {
  'use strict';
  return this;
}

expect(f()).toBeUndefined();
