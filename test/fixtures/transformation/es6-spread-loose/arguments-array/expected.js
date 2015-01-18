"use strict";

function foo() {
  return bar([].concat(arguments));
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");