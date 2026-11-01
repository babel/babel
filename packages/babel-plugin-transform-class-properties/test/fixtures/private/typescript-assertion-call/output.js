var _Foo_brand = /*#__PURE__*/new WeakSet();
var _f = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    babelHelpers.classPrivateFieldInitSpec(this, _f, function () {
      return this;
    });
  }
  return babelHelpers.createClass(Foo, [{
    key: "run",
    value: function run() {
      return [babelHelpers.assertClassBrand(_Foo_brand, this, _m).call(this), babelHelpers.assertClassBrand(_Foo_brand, this, _m).call(this), babelHelpers.classPrivateFieldGet2(_f, this).call(this)];
    }
  }]);
}();
function _m() {
  return this;
}
