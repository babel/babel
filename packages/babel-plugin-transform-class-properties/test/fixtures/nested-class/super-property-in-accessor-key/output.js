"use strict";

let Hello = /*#__PURE__*/function () {
  function Hello() {
    babelHelpers.classCallCheck(this, Hello);
  }
  babelHelpers.createClass(Hello, [{
    key: "toString",
    value: function toString() {
      return 'hello';
    }
  }]);
  return Hello;
}();
let Outer = /*#__PURE__*/function (_Hello) {
  babelHelpers.inherits(Outer, _Hello);
  var _super = babelHelpers.createSuper(Outer);
  function Outer() {
    var _computedKey;
    var _thisSuper, _this;
    babelHelpers.classCallCheck(this, Outer);
    _this = _super.call(this);
    _computedKey = babelHelpers.toPropertyKey(babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Outer.prototype)), "toString", _thisSuper).call(_thisSuper));
    var _A = /*#__PURE__*/new WeakMap();
    let Inner = /*#__PURE__*/function () {
      function Inner() {
        babelHelpers.classCallCheck(this, Inner);
        babelHelpers.classPrivateFieldInitSpec(this, _A, {
          writable: true,
          value: 'hello'
        });
      }
      babelHelpers.createClass(Inner, [{
        key: _computedKey,
        get: function () {
          return babelHelpers.classPrivateFieldGet(this, _A);
        }
      }, {
        key: _computedKey,
        set: function (v) {
          babelHelpers.classPrivateFieldSet(this, _A, v);
        }
      }]);
      return Inner;
    }();
    return babelHelpers.possibleConstructorReturn(_this, new Inner());
  }
  return babelHelpers.createClass(Outer);
}(Hello);
expect(new Outer().hello).toBe('hello');
