function f({x}) {
  'use strict';
  return this;
}

expect(f({x: 42})).toBeUndefined();
