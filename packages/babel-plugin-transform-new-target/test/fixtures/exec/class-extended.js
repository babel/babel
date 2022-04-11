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

expect(targets[0]).toBe(Foo);
expect(targets[1]).toBe(Bar);
expect(targets[2]).toBe(Bar);
