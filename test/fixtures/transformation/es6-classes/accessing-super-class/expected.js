"use strict";

var _slice = Array.prototype.slice;
var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Test = (function (Foo) {
  function Test() {
    var _get2, _get3;
    _classCallCheck(this, Test);

    woops["super"].test();
    _get(Foo.prototype, "constructor", this).call(this);
    _get(Foo.prototype, "test", this).call(this);

    _get(Foo.prototype, "constructor", this).apply(this, arguments);
    (_get2 = _get(Foo.prototype, "constructor", this)).call.apply(_get2, [this, "test"].concat(_slice.call(arguments)));

    _get(Foo.prototype, "test", this).apply(this, arguments);
    (_get3 = _get(Foo.prototype, "test", this)).call.apply(_get3, [this, "test"].concat(_slice.call(arguments)));
  }

  _inherits(Test, Foo);

  _prototypeProperties(Test, {
    foo: {
      value: function foo() {
        var _get2;
        _get(Foo, "foo", this).call(this);
        _get(Foo, "foo", this).apply(this, arguments);
        (_get2 = _get(Foo, "foo", this)).call.apply(_get2, [this, "test"].concat(_slice.call(arguments)));
      },
      writable: true,
      configurable: true
    }
  }, {
    test: {
      value: function test() {
        var _get2;
        _get(Foo.prototype, "test", this).call(this);
        _get(Foo.prototype, "test", this).apply(this, arguments);
        (_get2 = _get(Foo.prototype, "test", this)).call.apply(_get2, [this, "test"].concat(_slice.call(arguments)));
      },
      writable: true,
      configurable: true
    }
  });

  return Test;
})(Foo);