"use strict";

var bar = {
  foo: (function (_foo) {
    var _fooWrapper = function foo() {
      return _foo.apply(this, arguments);
    };

    _fooWrapper.toString = function () {
      return _foo.toString();
    };

    return _fooWrapper;
  })(function () {
    console.log(foo);
  })
};

var bar = {
  foo: (function (_foo) {
    var _fooWrapper = function foo() {
      return _foo.apply(this, arguments);
    };

    _fooWrapper.toString = function () {
      return _foo.toString();
    };

    return _fooWrapper;
  })(function () {
    var foo = 41;
    console.log(foo);
  })
};

var foobar = 123;
var foobar2 = {
  foobar: (function (_foobar) {
    var _foobarWrapper = function foobar() {
      return _foobar.apply(this, arguments);
    };

    _foobarWrapper.toString = function () {
      return _foobar.toString();
    };

    return _foobarWrapper;
  })(function () {
    console.log(foobar);
  })
};
