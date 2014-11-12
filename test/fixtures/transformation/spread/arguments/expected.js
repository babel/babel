"use strict";

function foo() {
  return bar.apply(null, ["test"].concat(Array.from(arguments)));
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");
