"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var _get = function get(object, property, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};

var _inherits = function (child, parent) {
  if (typeof parent !== "function" && parent !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof parent);
  }
  child.prototype = Object.create(parent && parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (parent) child.__proto__ = parent;
};

var Test = (function (Foo) {
  var Test = function Test() {
    _get(Object.getPrototypeOf(Test.prototype), "test", this).whatever();
    _get(Object.getPrototypeOf(Test.prototype), "test", this).call(this);
  };

  _inherits(Test, Foo);

  _prototypeProperties(Test, {
    test: {
      value: function () {
        return _get(Object.getPrototypeOf(Test), "wow", this).call(this);
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Test;
})(Foo);
