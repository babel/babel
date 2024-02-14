var _initStatic, _call_a, _Foo;
const dec = () => {};
class Foo {
  static setA(v) {
    babelHelpers.classPrivateSetter(this, Foo, _set_a, v);
  }
}
_Foo = Foo;
function _set_a(v) {
  _call_a(this, v);
}
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 12, "a", function (v) {
    return this.value = v;
  }]]).e;
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
