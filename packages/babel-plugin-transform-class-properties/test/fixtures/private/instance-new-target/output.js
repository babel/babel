var _a = /*#__PURE__*/new WeakMap();
var _b = /*#__PURE__*/new WeakMap();
var _c = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateFieldInitSpec(this, _a, void 0);
    babelHelpers.classPrivateFieldInitSpec(this, _b, () => void 0);
    babelHelpers.classPrivateFieldInitSpec(this, _c, function () {
      return new.target;
    });
    this.d = new.target;
  }
  return babelHelpers.createClass(Foo, [{
    key: "test",
    value: function test() {
      return [babelHelpers.classPrivateFieldGet2(_a, this), babelHelpers.classPrivateFieldGet2(_b, this).call(this), babelHelpers.classPrivateFieldGet2(_c, this), this.d];
    }
  }]);
}();
