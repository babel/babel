"use strict";

let Hello = /*#__PURE__*/function () {
  function Hello() {
    babelHelpers.classCallCheck(this, Hello);
  }
  return babelHelpers.createClass(Hello, [{
    key: "toString",
    value: function toString() {
      return 'hello';
    }
  }]);
}();
let Outer = /*#__PURE__*/function (_Hello) {
  function Outer() {
    let _computedKey;
    var _this;
    babelHelpers.classCallCheck(this, Outer);
    _this = babelHelpers.callSuper(this, Outer);
    var _A = /*#__PURE__*/new WeakMap();
    _computedKey = babelHelpers.toPropertyKey(babelHelpers.superPropGet((_this, Outer), "toString", _this, 3)([]));
    let Inner = /*#__PURE__*/function (_computedKey4, _computedKey5) {
      function Inner() {
        babelHelpers.classCallCheck(this, Inner);
        babelHelpers.classPrivateFieldInitSpec(this, _A, 'hello');
      }
      return babelHelpers.createClass(Inner, [{
        key: _computedKey4,
        get: function () {
          return babelHelpers.classPrivateFieldGet2(_A, this);
        }
      }, {
        key: _computedKey5,
        set: function (v) {
          babelHelpers.classPrivateFieldSet2(_A, this, v);
        }
      }]);
    }(_computedKey, _computedKey);
    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }
  babelHelpers.inherits(Outer, _Hello);
  return babelHelpers.createClass(Outer);
}(Hello);
expect(new Outer().hello).toBe('hello');
