var _Foo;
let _initStatic, _init_a, _init_b, _init_computedKey;
const dec = () => {};
class Foo {
  static get a() {
    return babelHelpers.assertClassBrand(Foo, this, _A)._;
  }
  static set a(v) {
    _A._ = babelHelpers.assertClassBrand(Foo, this, v);
  }
  static get b() {
    return babelHelpers.assertClassBrand(Foo, this, _B)._;
  }
  static set b(v) {
    _B._ = babelHelpers.assertClassBrand(Foo, this, v);
  }
  static get ['c']() {
    return babelHelpers.assertClassBrand(Foo, this, _C)._;
  }
  static set ['c'](v) {
    _C._ = babelHelpers.assertClassBrand(Foo, this, v);
  }
}
_Foo = Foo;
(() => {
  [_init_a, _init_b, _init_computedKey, _initStatic] = babelHelpers.applyDecs2301(_Foo, [[dec, 6, "a"], [dec, 6, "b"], [dec, 6, 'c']], []).e;
  _initStatic(_Foo);
})();
var _A = {
  _: _init_a(_Foo)
};
var _B = {
  _: _init_b(_Foo, 123)
};
var _C = {
  _: _init_computedKey(_Foo, 456)
};
