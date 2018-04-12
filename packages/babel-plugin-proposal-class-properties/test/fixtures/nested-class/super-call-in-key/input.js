"use strict";
class Hello {
  constructor() {
    return {
      toString() {
        return 'hello';
      },
    };
  }
}

class Outer extends Hello {
  constructor() {
    class Inner {
      [super()] = "hello";
    }

    return new Inner();
  }
}

assert.equal(new Outer().hello, 'hello');
