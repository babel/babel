function test(x) {
  var B =
  /*#__PURE__*/
  function () {
    "use strict";

    function B() {
      babelHelpers.classCallCheck(this, B);
      babelHelpers.defineProperty(this, "name", x);
    }

    babelHelpers.createClass(B, [{
      key: "fn",
      value: function fn() {
        return x;
      }
    }, {
      key: "dispatchTransaction",
      value: function dispatchTransaction() {
        return x;
      }
    }]);
    return B;
  }();

  var Foo =
  /*#__PURE__*/
  function (_B) {
    "use strict";

    babelHelpers.inherits(Foo, _B);
    babelHelpers.createClass(Foo, [{
      key: "silent",
      // static fields -------------
      // instance fields -------------
      get: function get() {
        return x;
      } // to be assigned later

    }]);

    function Foo() {
      var _this;

      babelHelpers.classCallCheck(this, Foo);
      _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this));
      babelHelpers.defineProperty(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this)), "log", {
        error: x
      });
      babelHelpers.defineProperty(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this)), "dispatchTransaction", _this.dispatchTransaction.bind(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this))));
      babelHelpers.defineProperty(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this)), "f1", function () {
        return x;
      });
      _this.f1 = _this.f1.bind(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this)));
      _this.end = 1;
      return _this;
    }

    return Foo;
  }(B);

  babelHelpers.defineProperty(Foo, "BAR", 'BAR');
}
