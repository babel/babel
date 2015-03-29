"use strict";

function render(text) {
  var _ref = <foo>{text}</foo>;

  return function () {
    return _ref;
  };
}

var Foo2 = require("Foo");

function createComponent(text) {
  var _ref = <Foo2>{text}</Foo2>;

  return function render() {
    return _ref;
  };
}