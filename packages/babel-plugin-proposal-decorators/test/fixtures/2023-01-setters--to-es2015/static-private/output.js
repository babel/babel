var _initStatic, _call_a, _Foo;
const dec = () => {};
class Foo {
  static setA(v) {
    babelHelpers.classPrivateSetter(Foo, _set_a, this, v);
  }
}
_Foo = Foo;
function _set_a(_this, v) {
  _call_a(_this, v);
}
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs2301(_Foo, [[dec, 9, "a", function (v) {
    return this.value = v;
  }]], []).e;
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
