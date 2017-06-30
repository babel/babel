"use strict";

class Foo {
  test() {
    return new.target;
  }
}

assert.equal(new Foo().test(), undefined);
