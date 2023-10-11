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
var _A = {
  writable: true,
  value: void 0
};
var _B = {
  writable: true,
  value: 123
};
var _C = {
  writable: true,
  value: 456
};
