var _initProto, _init_a, _init_b, _init_computedKey, _Foo;
const dec = () => {};
var _A = /*#__PURE__*/new WeakMap();
var _B = /*#__PURE__*/new WeakMap();
var _C = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _A, {
      writable: true,
      value: (_initProto(this), _init_a(this))
    });
    babelHelpers.classPrivateFieldInitSpec(this, _B, {
      writable: true,
      value: _init_b(this, 123)
    });
    babelHelpers.classPrivateFieldInitSpec(this, _C, {
      writable: true,
      value: _init_computedKey(this, 456)
    });
  }
  get a() {
    return babelHelpers.classPrivateFieldGet(this, _A);
  }
  set a(v) {
    babelHelpers.classPrivateFieldSet(this, _A, v);
  }
  get b() {
    return babelHelpers.classPrivateFieldGet(this, _B);
  }
  set b(v) {
    babelHelpers.classPrivateFieldSet(this, _B, v);
  }
  get ['c']() {
    return babelHelpers.classPrivateFieldGet(this, _C);
  }
  set ['c'](v) {
    babelHelpers.classPrivateFieldSet(this, _C, v);
  }
}
_Foo = Foo;
[_init_a, _init_b, _init_computedKey, _initProto] = babelHelpers.applyDecs2305(_Foo, [[dec, 1, "a"], [dec, 1, "b"], [dec, 1, 'c']], []).e;
