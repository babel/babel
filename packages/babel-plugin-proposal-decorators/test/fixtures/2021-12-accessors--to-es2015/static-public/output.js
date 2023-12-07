var _init_a, _init_b, _init_computedKey, _initStatic, _class;
const dec = () => {};
class Foo {
  static get a() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _A);
  }
  static set a(v) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _A, v);
  }
  static get b() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _B);
  }
  static set b(v) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _B, v);
  }
  static get ['c']() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _C);
  }
  static set ['c'](v) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _C, v);
  }
}
_class = Foo;
(() => {
  [_init_a, _init_b, _init_computedKey, _initStatic] = babelHelpers.applyDecs(_class, [[dec, 6, "a"], [dec, 6, "b"], [dec, 6, 'c']], []);
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
