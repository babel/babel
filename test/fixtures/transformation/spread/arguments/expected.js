"use strict";

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

function foo() {
  return bar.apply(null, ["test"].concat(_toArray(arguments)));
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");
