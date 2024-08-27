var _Class, _Foo3, _x, _A, _Foo3_brand, _B;
let _initClass, _staticBlock, _Foo2;
const dec = () => {};
let hasX, hasA, hasM;
let _Foo;
new (_Foo2 = (_x = /*#__PURE__*/new WeakMap(), _A = /*#__PURE__*/new WeakMap(), _Foo3_brand = /*#__PURE__*/new WeakSet(), _B = /*#__PURE__*/new WeakMap(), _Foo3 = class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo3_brand);
    babelHelpers.classPrivateFieldInitSpec(this, _x, void 0);
    babelHelpers.classPrivateFieldInitSpec(this, _A, void 0);
    babelHelpers.defineProperty(this, "x", void 0);
    babelHelpers.classPrivateFieldInitSpec(this, _B, void 0);
  }
  get a() {
    return babelHelpers.classPrivateFieldGet2(_B, this);
  }
  set a(v) {
    babelHelpers.classPrivateFieldSet2(_B, this, v);
  }
  m() {}
}, (() => {
  [_Foo, _initClass] = babelHelpers.applyDecs2311(_Foo3, [dec], []).c;
  _staticBlock = function () {
    hasX = o => _x.has(babelHelpers.checkInRHS(o));
    hasA = o => _Foo3_brand.has(babelHelpers.checkInRHS(o));
    hasM = o => _Foo3_brand.has(babelHelpers.checkInRHS(o));
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
function _m() {}
