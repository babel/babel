function _createSuper(Derived) { return function () { var Super = babelHelpers.getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function broken(x) {
  if (true) {
    var Foo = /*#__PURE__*/function (_Bar) {
      "use strict";

      babelHelpers.inherits(Foo, _Bar);

      var _super = _createSuper(Foo);

      function Foo() {
        babelHelpers.classCallCheck(this, Foo);
        return _super.apply(this, arguments);
      }

      return Foo;
    }(Bar);

    for (var _len = arguments.length, foo = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      foo[_key - 1] = arguments[_key];
    }

    return hello.apply(void 0, foo);
  }
}
