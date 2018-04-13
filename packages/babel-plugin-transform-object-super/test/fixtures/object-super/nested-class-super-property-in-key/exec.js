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

expect(Outer.constructor().hello()).toBe('hello');
