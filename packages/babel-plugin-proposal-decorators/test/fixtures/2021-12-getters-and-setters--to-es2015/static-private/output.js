var _initStatic, _call_a, _call_a2, _Foo;
const dec = () => {};
class Foo {
  static getA() {
    return babelHelpers.classPrivateGetter(this, Foo, _get_a);
  }
  static setA(v) {
    babelHelpers.classPrivateSetter(this, Foo, _set_a, v);
  }
}
_Foo = Foo;
function _get_a() {
  return _call_a(this);
}
function _set_a(v) {
  _call_a2(this, v);
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
