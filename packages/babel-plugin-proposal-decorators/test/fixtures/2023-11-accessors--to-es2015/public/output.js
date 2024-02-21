var _init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey, _Foo;
const dec = () => {};
var _A = /*#__PURE__*/new WeakMap();
var _B = /*#__PURE__*/new WeakMap();
var _C = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _A, _init_a(this));
    babelHelpers.classPrivateFieldInitSpec(this, _B, (_init_extra_a(this), _init_b(this, 123)));
    babelHelpers.classPrivateFieldInitSpec(this, _C, (_init_extra_b(this), _init_computedKey(this, 456)));
    _init_extra_computedKey(this);
  }
  get a() {
    return babelHelpers.classPrivateFieldGet2(this, _A);
  }
  set a(v) {
    babelHelpers.classPrivateFieldSet2(this, _A, v);
  }
  get b() {
    return babelHelpers.classPrivateFieldGet2(this, _B);
  }
  set b(v) {
    babelHelpers.classPrivateFieldSet2(this, _B, v);
  }
  get ['c']() {
    return babelHelpers.classPrivateFieldGet2(this, _C);
  }
  set ['c'](v) {
    babelHelpers.classPrivateFieldSet2(this, _C, v);
  }
}
_Foo = Foo;
[_init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 1, "a"], [dec, 1, "b"], [dec, 1, 'c']]).e;
