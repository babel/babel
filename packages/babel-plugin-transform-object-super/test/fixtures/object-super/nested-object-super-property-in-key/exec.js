"use strict";
const Hello = {
  toString() {
    return 'hello';
  }
};

const Outer = {
  constructor() {
    const Inner = {
      [super.toString()]() {
        return 'hello';
      },
    };

    return Inner;
  }
};
Object.setPrototypeOf(Outer, Hello);

assert.equal(Outer.constructor().hello(), 'hello');
