"use strict";

var x = function x(foo) {
  for (var _len = arguments.length, bar = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    bar[_key - 1] = arguments[_key];
  }

  console.log(bar);
};

var y = function y(foo) {
  var x = function z(bar) {
    bar[1] = 5;
  };
};

var z = function z(foo) {
  for (var _len = arguments.length, bar = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    bar[_key - 1] = arguments[_key];
  }

  var x = function x() {
    bar[1] = 5;
  };
};

