var _Class, _Class_brand, _Foo3, _x, _A, _Foo3_brand, _B;
let _initClass, _method, _Foo2;
const dec = () => {};
let hasX, hasA, hasM;
class Base {
  static id(v) {
    return v;
  }
}
let _Foo;
new (_Class_brand = /*#__PURE__*/new WeakSet(), _Foo2 = (_x = /*#__PURE__*/new WeakMap(), _A = /*#__PURE__*/new WeakMap(), _Foo3_brand = /*#__PURE__*/new WeakSet(), _B = /*#__PURE__*/new WeakMap(), _Foo3 = class Foo extends Base {
  constructor(...args) {
    super(...args);
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
  [_Foo, _initClass] = babelHelpers.applyDecs2311(_Foo3, [dec], [], 0, void 0, Base).c;
  _method = function () {
    babelHelpers.superPropGet(_Foo, "id", this, 2)([this]);
    hasX = o => _x.has(babelHelpers.checkInRHS(o));
    hasA = o => _Foo3_brand.has(babelHelpers.checkInRHS(o));
    hasM = o => _Foo3_brand.has(babelHelpers.checkInRHS(o));
  };
})(), _Foo3), _Class = class extends babelHelpers.identity {
  constructor() {
    super(_Foo), babelHelpers.classPrivateMethodInitSpec(this, _Class_brand), this, _initClass();
  }
}, babelHelpers.defineProperty(_Class, _Foo2, void 0), _Class)();
function _get_a(_this) {
  return babelHelpers.classPrivateFieldGet2(_A, _this);
}
function _set_a(_this2, v) {
  babelHelpers.classPrivateFieldSet2(_A, _this2, v);
}
function _m() {}
function _method2(...arg) {
  return _method.apply(this, arg);
}
