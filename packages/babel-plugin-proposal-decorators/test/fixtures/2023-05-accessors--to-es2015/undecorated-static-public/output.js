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
var _A = {
  _: void 0
};
var _B = {
  _: 123
};
var _C = {
  _: 456
};
