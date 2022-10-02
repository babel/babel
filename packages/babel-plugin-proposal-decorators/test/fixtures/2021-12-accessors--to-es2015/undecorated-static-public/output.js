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
