"use strict";
class Hello {
  toString() {
    return 'hello';
  }
}

class Outer extends Hello {
  constructor() {
    super();
    const Inner = {
      [super.toString()]() {
        return 'hello';
      },
    };

    return Inner;
  }
}

assert.equal(new Outer().hello(), 'hello');
