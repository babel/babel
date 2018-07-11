"use strict";
class Foo {
  constructor() {
    return { x: 1 };
  }
}

expect(new Foo().x).toBe(1);

class Bar extends Foo {
  constructor() {
    super();
    return;
  }
}

expect(new Bar().x).toBe(1);

class Bar2 extends Foo {
  constructor() {
    super();
    expect(this.x).toBe(1);
    return { x: 2 };
  }
}

expect(new Bar2().x).toBe(2);


let singleton;
class Sub extends Foo {
  constructor() {
    if (singleton) {
      return singleton;
    }
    singleton = super();
  }
}

let instance = new Sub;
expect(instance).toBe(singleton);

instance = new Sub;
expect(instance).toBe(singleton);
