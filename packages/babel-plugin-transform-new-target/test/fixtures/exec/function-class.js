"use strict";

const targets = [];
function Foo() {
  targets.push(new.target);
}

new Foo;

expect(targets[0]).toBe(Foo);
