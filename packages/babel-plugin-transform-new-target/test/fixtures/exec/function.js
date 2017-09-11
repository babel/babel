"use strict";

const targets = [];
function foo() {
  targets.push(new.target);
}

foo();
foo.call({});

assert.equal(targets[0], undefined);
assert.equal(targets[1], undefined);
