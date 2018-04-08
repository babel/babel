"use strict";
const Hello = {
  toString() {
    return 'hello';
  }
};

const Outer = {
  constructor() {
    class Inner {
      [super.toString()]() {
        return 'hello';
      }
    }

    return new Inner();
  }
};
Object.setPrototypeOf(Outer, Hello);

assert.equal(Outer.constructor().hello(), 'hello');
