"use strict";

const targets = [];
function Foo() {
  targets.push(new.target);
}

function Bar() {
  Foo.call(this);
}

new Foo;
new Bar();

assert.equal(targets[0], Foo);
assert.equal(targets[1], undefined);
