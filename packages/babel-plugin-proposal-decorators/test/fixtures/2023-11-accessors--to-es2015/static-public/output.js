var _init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey, _Foo;
const dec = () => {};
class Foo {
  static get a() {
    return _A._;
  }
  static set a(v) {
    _A._ = v;
  }
  static get b() {
    return _B._;
  }
  static set b(v) {
    _B._ = v;
  }
  static get ['c']() {
    return _C._;
  }
  static set ['c'](v) {
    _C._ = v;
  }
}
_Foo = Foo;
[_init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 9, "a"], [dec, 9, "b"], [dec, 9, 'c']]).e;
var _A = {
  _: _init_a()
};
var _B = {
  _: (_init_extra_a(), _init_b(123))
};
var _C = {
  _: (_init_extra_b(), _init_computedKey(456))
};
_init_extra_computedKey();
