"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Test = (function (Foo) {
  function Test() {
    _classCallCheck(this, Test);

    _get(Object.getPrototypeOf(Test.prototype), "test", this).whatever();
    _get(Object.getPrototypeOf(Test.prototype), "test", this).call(this);
  }

  _inherits(Test, Foo);

  _prototypeProperties(Test, {
    test: {
      value: function test() {
        return _get(Object.getPrototypeOf(Test), "wow", this).call(this);
      },
      writable: true,
      configurable: true
    }
  });

  return Test;
})(Foo);