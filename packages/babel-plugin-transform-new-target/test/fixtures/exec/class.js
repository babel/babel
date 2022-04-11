"use strict";

const targets = [];
class Foo {
  constructor() {
    targets.push(new.target);
  }
}

new Foo;

expect(targets[0]).toBe(Foo);
