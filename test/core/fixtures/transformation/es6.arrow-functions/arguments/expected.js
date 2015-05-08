"use strict";

function one() {
  var _arguments = arguments;

  var inner = function inner() {
    return _arguments;
  };
  return [].slice.call(inner());
}
one(1, 2);

function two() {
  var _arguments2 = arguments;

  var inner = function inner() {
    return _arguments2;
  };

  var another = function another() {
    var _arguments3 = arguments;

    var inner2 = function inner2() {
      return _arguments3;
    };
  };

  return [].slice.call(inner());
}
two(1, 2);

function three() {
  var _arguments4 = arguments;

  var fn = function fn() {
    return _arguments4[0] + "bar";
  };
  return fn();
}
three("foo");

function four() {
  var _arguments5 = arguments;

  var fn = function fn() {
    return _arguments5[0].foo + "bar";
  };
  return fn();
}
four({ foo: "foo" });

function five(obj) {
  var fn = function fn() {
    return obj.arguments[0].foo + "bar";
  };
  return fn();
}
five({ arguments: ["foo"] });

function six(obj) {
  var fn = function fn() {
    var fn2 = function fn2() {
      return arguments[0];
    };
    return fn2("foobar");
  };
  return fn();
}
six();
