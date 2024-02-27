var _initStatic, _call_a, _call_a2, _Foo;
const dec = () => {};
class Foo {
  static getA() {
    return babelHelpers.classPrivateGetter(Foo, this, _get_a);
  }
  static setA(v) {
    babelHelpers.classPrivateSetter(Foo, _set_a, this, v);
  }
}
_Foo = Foo;
function _get_a(_this) {
  return _call_a(_this);
}
function _set_a(_this2, v) {
  _call_a2(_this2, v);
}
(() => {
  [_call_a, _call_a2, _initStatic] = babelHelpers.applyDecs(_Foo, [[dec, 8, "a", function () {
    return this.value;
  }], [dec, 9, "a", function (v) {
    this.value = v;
  }]], []);
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
