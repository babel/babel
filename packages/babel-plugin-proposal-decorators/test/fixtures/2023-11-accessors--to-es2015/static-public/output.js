var _init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey, _Foo;
const dec = () => {};
class Foo {
  static get a() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _A);
  }
  static set a(v) {
    babelHelpers.classStaticPrivateFieldSpecSet(Foo, Foo, _A, v);
  }
  static get b() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _B);
  }
  static set b(v) {
    babelHelpers.classStaticPrivateFieldSpecSet(Foo, Foo, _B, v);
  }
  static get ['c']() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _C);
  }
  static set ['c'](v) {
    babelHelpers.classStaticPrivateFieldSpecSet(Foo, Foo, _C, v);
  }
}
_Foo = Foo;
[_init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey] = babelHelpers.applyDecs2311(_Foo, [[dec, 9, "a"], [dec, 9, "b"], [dec, 9, 'c']], []).e;
var _A = {
  writable: true,
  value: _init_a(_Foo)
};
var _B = {
  writable: true,
  value: (_init_extra_a(_Foo), _init_b(_Foo, 123))
};
var _C = {
  writable: true,
  value: (_init_extra_b(_Foo), _init_computedKey(_Foo, 456))
};
_init_extra_computedKey(_Foo);
