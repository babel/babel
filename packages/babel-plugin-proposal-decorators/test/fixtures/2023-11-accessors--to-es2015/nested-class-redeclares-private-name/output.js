var _x = /*#__PURE__*/new WeakMap();
class A {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _x, 1);
  }
  static getB() {
    var _A2, _B_brand;
    return _A2 = /*#__PURE__*/new WeakMap(), _B_brand = /*#__PURE__*/new WeakSet(), class B {
      constructor() {
        babelHelpers.classPrivateMethodInitSpec(this, _B_brand);
        babelHelpers.classPrivateFieldInitSpec(this, _A2, 2);
      }
      static read(o) {
        return babelHelpers.classPrivateGetter(_B_brand, o, _get_x);
      }
      static has(o) {
        return _B_brand.has(babelHelpers.checkInRHS(o));
      }
    };
    function _get_x(_this) {
      return babelHelpers.classPrivateFieldGet2(_A2, _this);
    }
    function _set_x(_this2, v) {
      babelHelpers.classPrivateFieldSet2(_A2, _this2, v);
    }
  }
}
