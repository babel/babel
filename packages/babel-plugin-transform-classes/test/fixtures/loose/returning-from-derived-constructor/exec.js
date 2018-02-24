"use strict";
class Foo {
  constructor() {
    return { x: 1 };
  }
}

assert.equal(new Foo().x, 1);

class Bar extends Foo {
  constructor() {
    super();
    return;
  }
}

assert.equal(new Bar().x, 1);

class Bar2 extends Foo {
  constructor() {
    super();
    assert.equal(this.x, 1);
    return { x: 2 };
  }
}

assert.equal(new Bar2().x, 2);


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
assert.equal(instance, singleton);

instance = new Sub;
assert.equal(instance, singleton);
