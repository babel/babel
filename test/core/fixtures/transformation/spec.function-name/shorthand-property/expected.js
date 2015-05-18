"use strict";

var Utils = {
  get: function get() {}
};

var _get = Utils.get;

var bar = {
  get: function get(arg) {
    _get(arg, "baz");
  }
};

var f = function f(_ref) {
  var _ref$foo = _ref.foo;

  var _foo = _ref$foo === undefined ? "bar" : _ref$foo;

  var obj = {
    // same name as parameter
    foo: function foo() {
      _foo;
    }
  };
};
