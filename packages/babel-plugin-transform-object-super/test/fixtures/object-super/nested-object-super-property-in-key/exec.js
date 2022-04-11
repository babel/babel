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

expect(Outer.constructor().hello()).toBe('hello');
