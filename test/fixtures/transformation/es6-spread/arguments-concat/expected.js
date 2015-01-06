"use strict";

var _slice = Array.prototype.slice;
function foo() {
  return bar.apply(undefined, ["test"].concat(_slice.call(arguments)));
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");
