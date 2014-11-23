"use strict";

var _argumentsToArray = function (args) {
  var target = new Array(args.length);
  for (var i = 0; i < args.length; i++) {
    target[i] = args[i];
  }

  return target;
};

var t = function (f) {
  var items = _argumentsToArray(arguments).slice(1);
};

function t(f) {
  var items = _argumentsToArray(arguments).slice(1);
}
