var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }
  return babelHelpers.createClass(Foo, [{
    key: "method",
    value: function method(_Foo) {
      return babelHelpers.superPropertyGetCall(Foo, "method", this, 1, [_Foo]);
    }
  }]);
}();
var Bar = /*#__PURE__*/function () {
  "use strict";

  function Bar() {
    babelHelpers.classCallCheck(this, Bar);
  }
  return babelHelpers.createClass(Bar, [{
    key: "method",
    value: function method() {
      return () => {
        var _Bar;
        return babelHelpers.superPropertyGetCall(Bar, "method", this, 1, [_Bar]);
      };
    }
  }]);
}();
var Baz = /*#__PURE__*/function () {
  "use strict";

  function Baz() {
    babelHelpers.classCallCheck(this, Baz);
  }
  return babelHelpers.createClass(Baz, [{
    key: "method",
    value: function method() {
      var _Baz = /*#__PURE__*/function () {
        function _Baz() {
          babelHelpers.classCallCheck(this, _Baz);
        }
        return babelHelpers.createClass(_Baz, [{
          key: "f",
          value: function f() {
            var Baz = 1;
            return Baz;
          }
        }]);
      }();
      return babelHelpers.superPropertyGetCall(Baz, "method", this, 1, [_Baz]);
    }
  }]);
}();
