var _initClass, _x, _A, _a, _m, _B, _temp;
const dec = () => {};
let hasX, hasA, hasM;
let _Foo;
new (_x = /*#__PURE__*/new WeakMap(), _A = /*#__PURE__*/new WeakMap(), _a = /*#__PURE__*/new WeakMap(), _m = /*#__PURE__*/new WeakSet(), _B = /*#__PURE__*/new WeakMap(), (_temp = class extends babelHelpers.identity {
  constructor() {
    (super(_Foo), babelHelpers.classPrivateMethodInitSpec(this, _m), babelHelpers.classPrivateFieldInitSpec(this, _a, {
      get: _get_a,
      set: _set_a
    }), babelHelpers.classPrivateFieldInitSpec(this, _x, {
      writable: true,
      value: void 0
    }), babelHelpers.classPrivateFieldInitSpec(this, _A, {
      writable: true,
      value: void 0
    }), babelHelpers.defineProperty(this, "x", void 0), babelHelpers.classPrivateFieldInitSpec(this, _B, {
      writable: true,
      value: void 0
    }), this), (() => {
      hasX = o => _x.has(babelHelpers.checkInRHS(o));
      hasA = o => _a.has(babelHelpers.checkInRHS(o));
      hasM = o => _m.has(babelHelpers.checkInRHS(o));
    })(), _initClass();
  }
}, (_Foo2 => {
  class Foo {
    static get a() {
      return babelHelpers.classPrivateFieldGet(this, _B);
    }
    static set a(v) {
      babelHelpers.classPrivateFieldSet(this, _B, v);
    }
    static m() {}
  }
  _Foo2 = Foo;
  [_Foo, _initClass] = babelHelpers.applyDecs2301(_Foo2, [], [dec]).c;
})(), _temp))();
function _get_a() {
  return babelHelpers.classPrivateFieldGet(this, _A);
}
function _set_a(v) {
  babelHelpers.classPrivateFieldSet(this, _A, v);
}
function _m2() {}
