"use strict";
class Hello {
  toString() {
    return 'hello';
  }
}

class Outer extends Hello {
  constructor() {
    super();
    class Inner {
      [super.toString()]() {
        return 'hello';
      }
    }

    return new Inner();
  }
}

assert.equal(new Outer().hello(), 'hello');
