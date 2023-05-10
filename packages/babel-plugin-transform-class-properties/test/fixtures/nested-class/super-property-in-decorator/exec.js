"use strict";
class Hello {
  dec() { return () => "hello" }
}

class Outer extends Hello {
  constructor() {
    super();
    class Inner {
      @(super.dec) hello;
    }

    return new Inner();
  }
}

expect(new Outer().hello).toBe('hello');
