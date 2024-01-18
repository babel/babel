var _initClass, _x, _m, _temp;
const dec = () => {};
let hasX, hasM;
let _Foo;
new (_x = /*#__PURE__*/new WeakMap(), _m = /*#__PURE__*/new WeakSet(), (_temp = class extends babelHelpers.identity {
  constructor() {
    (super(_Foo), babelHelpers.classPrivateMethodInitSpec(this, _m), babelHelpers.classPrivateFieldInitSpec(this, _x, {
      writable: true,
      value: void 0
    }), babelHelpers.defineProperty(this, "x", void 0)), (() => {
      hasX = o => _x.has(babelHelpers.checkInRHS(o));
      hasM = o => _m.has(babelHelpers.checkInRHS(o));
    })(), _initClass();
  }
}, (_Foo2 => {
  class Foo {
    static m() {}
  }
  _Foo2 = Foo;
  [_Foo, _initClass] = babelHelpers.applyDecs(_Foo2, [], [dec]);
})(), _temp))();
function _m2() {}
