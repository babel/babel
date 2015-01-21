"use strict";

function one() {
  var _arguments = arguments;
  var inner = function () {
    return _arguments;
  };
  return [].slice.call(inner());
}
one(1, 2);

function two() {
  var _arguments = arguments;
  var inner = function () {
    return _arguments;
  };

  var another = function () {
    var _arguments2 = arguments;
    var inner2 = function () {
      return _arguments2;
    };
  };

  return [].slice.call(inner());
}
two(1, 2);

function three() {
  var _arguments = arguments;
  var fn = function () {
    return _arguments[0] + "bar";
  };
  return fn();
}
three("foo");

function four() {
  var _arguments = arguments;
  var fn = function () {
    return _arguments[0].foo + "bar";
  };
  return fn();
}
four({ foo: "foo" });

function five(obj) {
  var fn = function () {
    return obj.arguments[0].foo + "bar";
  };
  return fn();
}
five({ arguments: ["foo"] });

function six(obj) {
  var fn = function () {
    var fn2 = function () {
      return arguments[0];
    };
    return fn2("foobar");
  };
  return fn();
}
six();
