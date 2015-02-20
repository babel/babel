"use strict";

var bar = {
  foo: (function () {
    function _getOuter() {
      return foo;
    }

    return function foo() {
      console.log(_getOuter());
    };
  })()
};

var bar = {
  foo: function foo() {
    var foo = 41;
    console.log(foo);
  }
};

var foobar = 123;
var foobar2 = {
  foobar: (function () {
    function _getOuter() {
      return foobar;
    }

    return function foobar() {
      console.log(_getOuter());
    };
  })()
};
