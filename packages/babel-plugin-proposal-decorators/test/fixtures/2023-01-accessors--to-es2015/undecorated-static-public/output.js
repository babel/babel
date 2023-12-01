var _computedKey;
const dec = () => {};
_computedKey = 'c';
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
  static get [_computedKey]() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _C);
  }
  static set [_computedKey](v) {
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
