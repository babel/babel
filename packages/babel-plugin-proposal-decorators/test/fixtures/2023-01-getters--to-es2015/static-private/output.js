var _initStatic, _call_a, _Foo;
const dec = () => {};
class Foo {
  static getA() {
    return babelHelpers.classPrivateGetter(this, Foo, _get_a);
  }
}
_Foo = Foo;
function _get_a() {
  return _call_a(this);
}
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs2301(_Foo, [[dec, 8, "a", function () {
    return this.value;
  }]], []).e;
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
