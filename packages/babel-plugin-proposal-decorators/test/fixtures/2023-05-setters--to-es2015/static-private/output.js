var _Foo;
let _initStatic, _call_a;
const dec = () => {};
class Foo {
  static setA(v) {
    babelHelpers.classPrivateSetter(Foo, _call_a, this, v);
  }
}
_Foo = Foo;
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs2305(_Foo, [[dec, 12, "a", function (v) {
    return this.value = v;
  }]], []).e;
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
