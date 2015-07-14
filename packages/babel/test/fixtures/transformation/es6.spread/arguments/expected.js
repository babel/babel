"use strict";

function foo() {
  return bar.apply(undefined, arguments);
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");
