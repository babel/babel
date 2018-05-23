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

expect(targets[0]).toBe(Foo);
expect(targets[1]).toBeUndefined();
