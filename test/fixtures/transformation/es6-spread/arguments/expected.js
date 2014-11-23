"use strict";

var _argumentsToArray = function (args) {
  var target = new Array(args.length);
  for (var i = 0; i < args.length; i++) {
    target[i] = args[i];
  }

  return target;
};

function foo() {
  return bar.apply(null, ["test"].concat(_argumentsToArray(arguments)));
}

function bar(one, two, three) {
  return [one, two, three];
}

foo("foo", "bar");
