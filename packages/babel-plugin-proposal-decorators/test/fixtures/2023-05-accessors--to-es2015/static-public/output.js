var _init_a, _init_b, _computedKey, _init_computedKey, _initStatic;
const dec = () => {};
_computedKey = 'c';
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
  static get [_computedKey]() {
    return babelHelpers.classStaticPrivateFieldSpecGet(Foo, Foo, _C);
  }
  static set [_computedKey](v) {
    babelHelpers.classStaticPrivateFieldSpecSet(Foo, Foo, _C, v);
  }
}
(() => {
  [_init_a, _init_b, _init_computedKey, _initStatic] = babelHelpers.applyDecs2305(Foo, [[dec, 9, "a"], [dec, 9, "b"], [dec, 9, _computedKey]], []).e;
  _initStatic(Foo);
})();
var _A = {
  writable: true,
  value: _init_a(Foo)
};
var _B = {
  writable: true,
  value: _init_b(Foo, 123)
};
var _C = {
  writable: true,
  value: _init_computedKey(Foo, 456)
};
