"use strict";

var count = function count() {
  var _arguments = arguments;
  var _again = true;

  _function: while (_again) {
    _again = false;
    var i = _arguments.length <= 0 || _arguments[0] === undefined ? 10 : _arguments[0];

    if (!i) return;
    _arguments = [i - 1];
    _again = true;
    i = undefined;
    continue _function;
  }
};

function count2() {
  var _arguments2 = arguments;
  var _again2 = true;

  _function2: while (_again2) {
    _again2 = false;
    var i = _arguments2.length <= 0 || _arguments2[0] === undefined ? 10 : _arguments2[0];

    if (!i) return;
    _arguments2 = [i - 1];
    _again2 = true;
    i = undefined;
    continue _function2;
  }
}