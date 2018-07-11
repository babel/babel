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
    const Inner = {
      [super()]() {
        return 'hello';
      },
    };

    return Inner;
  }
}

expect(new Outer().hello()).toBe('hello');
