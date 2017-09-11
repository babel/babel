"use strict";

const targets = [];
function Foo() {
  targets.push(new.target);
}

new Foo;

assert.equal(targets[0], Foo);
