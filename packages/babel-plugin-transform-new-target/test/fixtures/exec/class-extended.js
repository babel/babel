"use strict";

const targets = [];
class Foo {
  constructor() {
    targets.push(new.target);
  }
}

class Bar extends Foo {
  constructor() {
    super();
    targets.push(new.target);
  }
}

new Foo;
new Bar;

assert.equal(targets[0], Foo);
assert.equal(targets[1], Bar);
assert.equal(targets[2], Bar);
