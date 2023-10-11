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
    let _babelHelpers$get$cal, _babelHelpers$get$cal2;
    var _thisSuper, _this;
    babelHelpers.classCallCheck(this, Outer);
    _this = _super.call(this);
    var _A = /*#__PURE__*/new WeakMap();
    _babelHelpers$get$cal = babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Outer.prototype)), "toString", _thisSuper).call(_thisSuper);
    _babelHelpers$get$cal2 = babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Outer.prototype)), "toString", _thisSuper).call(_thisSuper);
    let Inner = /*#__PURE__*/function () {
      function Inner() {
        babelHelpers.classCallCheck(this, Inner);
        babelHelpers.classPrivateFieldInitSpec(this, _A, {
          writable: true,
          value: 'hello'
        });
      }
      babelHelpers.createClass(Inner, [{
        key: _babelHelpers$get$cal,
        get: function () {
          return babelHelpers.classPrivateFieldGet(this, _A);
        }
      }, {
        key: _babelHelpers$get$cal2,
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
