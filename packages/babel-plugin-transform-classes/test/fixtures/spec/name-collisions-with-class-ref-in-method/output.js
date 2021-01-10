var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, [{
    key: "method",
    value: function method(_Foo) {
      return babelHelpers.get(babelHelpers.getPrototypeOf(Foo.prototype), "method", this).call(this, _Foo);
    }
  }]);
  return Foo;
}();

var Bar = /*#__PURE__*/function () {
  "use strict";

  function Bar() {
    babelHelpers.classCallCheck(this, Bar);
  }

  babelHelpers.createClass(Bar, [{
    key: "method",
    value: function method() {
      return () => {
        var _Bar;

        return babelHelpers.get(babelHelpers.getPrototypeOf(Bar.prototype), "method", this).call(this, _Bar);
      };
    }
  }]);
  return Bar;
}();

var Baz = /*#__PURE__*/function () {
  "use strict";

  function Baz() {
    babelHelpers.classCallCheck(this, Baz);
  }

  babelHelpers.createClass(Baz, [{
    key: "method",
    value: function method() {
      var _Baz2 = /*#__PURE__*/function () {
        function _Baz2() {
          babelHelpers.classCallCheck(this, _Baz2);
        }

        babelHelpers.createClass(_Baz2, [{
          key: "f",
          value: function f() {
            var Baz = 1;
            return Baz;
          }
        }]);
        return _Baz2;
      }();

      return babelHelpers.get(babelHelpers.getPrototypeOf(Baz.prototype), "method", this).call(this, _Baz);
    }
  }]);
  return Baz;
}();
