"use strict";

function add() {
  var _arguments = arguments;

  return [1, 2, 3].map(function (i) {
    return i * _arguments[0];
  });
}

add(5);
