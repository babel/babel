var _init_a, _init_b, _init_computedKey, _initStatic, _class;
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
_class = Foo;
(() => {
  [_init_a, _init_b, _init_computedKey, _initStatic] = babelHelpers.applyDecs2305(_class, [[dec, 9, "a"], [dec, 9, "b"], [dec, 9, 'c']], []).e;
  _initStatic(_class);
})();
var _A = {
  writable: true,
  value: _init_a(_class)
};
var _B = {
  writable: true,
  value: _init_b(_class, 123)
};
var _C = {
  writable: true,
  value: _init_computedKey(_class, 456)
};
