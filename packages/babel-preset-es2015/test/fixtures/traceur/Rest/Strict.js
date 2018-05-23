function f(...xs) {
  'use strict';
  return this;
}

expect(f()).toBeUndefined();
