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
      [super()]() {
        return 'hello';
      }
    }

    return new Inner();
  }
}

expect(new Outer().hello()).toBe('hello');
