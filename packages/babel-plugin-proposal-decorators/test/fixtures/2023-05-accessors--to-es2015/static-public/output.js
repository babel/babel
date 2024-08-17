var _Foo;
let _initStatic, _init_a, _init_b, _init_computedKey;
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
(() => {
  [_init_a, _init_b, _init_computedKey, _initStatic] = babelHelpers.applyDecs2305(_Foo, [[dec, 9, "a"], [dec, 9, "b"], [dec, 9, 'c']], []).e;
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
