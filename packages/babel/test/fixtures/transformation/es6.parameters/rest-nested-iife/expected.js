"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function broken(x) {
  for (var _len = arguments.length, foo = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    foo[_key - 1] = arguments[_key];
  }

  if (true) {
    var _ret = (function () {
      var Foo = (function (_Bar) {
        _inherits(Foo, _Bar);

        function Foo() {
          _classCallCheck(this, Foo);

          _get(Object.getPrototypeOf(Foo.prototype), "constructor", this).apply(this, arguments);
        }

        return Foo;
      })(Bar);

      return {
        v: hello.apply(undefined, foo)
      };
    })();

    if (typeof _ret === "object") return _ret.v;
  }
}
