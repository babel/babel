"use strict";

const targets = [];
function foo() {
  targets.push(new.target);
}

foo();
foo.call({});

expect(targets[0]).toBeUndefined();
expect(targets[1]).toBeUndefined();
