"use strict";

const targets = [];
class Foo {
  constructor() {
    targets.push(new.target);
  }
}

new Foo;

assert.equal(targets[0], Foo);
