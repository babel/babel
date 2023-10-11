"use strict";
class Hello {
  constructor() {
    return () => () => "hello";
  }
}

class Outer extends Hello {
  constructor() {
    class Inner {
      @(super()) hello;
    }

    return new Inner();
  }
}

expect(new Outer().hello).toBe('hello');
