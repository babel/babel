var _Class, _Foo3, _x, _A, _Foo3_brand;
let _initClass, _staticBlock, _Foo2;
const dec = () => {};
let getX, getA, callM;
let _Foo;
new (_Foo2 = (_x = /*#__PURE__*/new WeakMap(), _A = /*#__PURE__*/new WeakMap(), _Foo3_brand = /*#__PURE__*/new WeakSet(), _Foo3 = class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo3_brand);
    babelHelpers.classPrivateFieldInitSpec(this, _x, "#x");
    babelHelpers.classPrivateFieldInitSpec(this, _A, "#a");
  }
}, (() => {
  [_Foo, _initClass] = babelHelpers.applyDecs2311(_Foo3, [dec], []).c;
  _staticBlock = function () {
    staticThis = this;
    getX = _p => {
      var x = babelHelpers.classPrivateFieldGet2(_x, _p);
      return x;
    };
    getA = _p2 => {
      var a = babelHelpers.classPrivateGetter(_Foo3_brand, _p2, _get_a);
      return a;
    };
    callM = _p3 => {
      var m = babelHelpers.assertClassBrand(_Foo3_brand, _p3, _m);
      return m();
    };
  };
})(), _Foo3), _Class = class extends babelHelpers.identity {
  constructor() {
    super(_Foo), _staticBlock.call(this), _initClass();
  }
}, babelHelpers.defineProperty(_Class, _Foo2, void 0), _Class)();
function _get_a(_this) {
  return babelHelpers.classPrivateFieldGet2(_A, _this);
}
function _set_a(_this2, v) {
  babelHelpers.classPrivateFieldSet2(_A, _this2, v);
}
function _m() {
  return "#m";
}
