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
      [super.toString()] = 'hello';
    }

    return new Inner();
  }
}

assert.equal(new Outer().hello, 'hello');
