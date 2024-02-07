const dec = () => {};
class Foo {
  static get a() {
    return babelHelpers.assertClassBrand(this, Foo, _A)._;
  }
  static set a(v) {
    _A._ = babelHelpers.assertClassBrand(this, Foo, v);
  }
  static get b() {
    return babelHelpers.assertClassBrand(this, Foo, _B)._;
  }
  static set b(v) {
    _B._ = babelHelpers.assertClassBrand(this, Foo, v);
  }
  static get ['c']() {
    return babelHelpers.assertClassBrand(this, Foo, _C)._;
  }
  static set ['c'](v) {
    _C._ = babelHelpers.assertClassBrand(this, Foo, v);
  }
}
var _A = {
  _: void 0
};
var _B = {
  _: 123
};
var _C = {
  _: 456
};
