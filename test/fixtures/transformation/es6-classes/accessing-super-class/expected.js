"use strict";

var _slice = Array.prototype.slice;
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

var _inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) subClass.__proto__ = superClass;
};

var Test = (function (Foo) {
  function Test() {
    var _get2, _get3, _get4, _get5;
    woops["super"].test();
    _get(Object.getPrototypeOf(Test.prototype), "constructor", this).call(this);
    _get(Object.getPrototypeOf(Test.prototype), "test", this).call(this);

    (_get2 = _get(Object.getPrototypeOf(Test.prototype), "constructor", this)).call.apply(_get2, [this].concat(_slice.call(arguments)));
    (_get3 = _get(Object.getPrototypeOf(Test.prototype), "constructor", this)).call.apply(_get3, [this, "test"].concat(_slice.call(arguments)));

    (_get4 = _get(Object.getPrototypeOf(Test.prototype), "test", this)).call.apply(_get4, [this].concat(_slice.call(arguments)));
    (_get5 = _get(Object.getPrototypeOf(Test.prototype), "test", this)).call.apply(_get5, [this, "test"].concat(_slice.call(arguments)));
  }

  _inherits(Test, Foo);

  _prototypeProperties(Test, {
    foo: {
      value: function () {
        var _get6, _get7;
        _get(Object.getPrototypeOf(Test), "foo", this).call(this);
        (_get6 = _get(Object.getPrototypeOf(Test), "foo", this)).call.apply(_get6, [this].concat(_slice.call(arguments)));
        (_get7 = _get(Object.getPrototypeOf(Test), "foo", this)).call.apply(_get7, [this, "test"].concat(_slice.call(arguments)));
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  }, {
    test: {
      value: function () {
        var _get8, _get9;
        _get(Object.getPrototypeOf(Test.prototype), "test", this).call(this);
        (_get8 = _get(Object.getPrototypeOf(Test.prototype), "test", this)).call.apply(_get8, [this].concat(_slice.call(arguments)));
        (_get9 = _get(Object.getPrototypeOf(Test.prototype), "test", this)).call.apply(_get9, [this, "test"].concat(_slice.call(arguments)));
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Test;
})(Foo);
