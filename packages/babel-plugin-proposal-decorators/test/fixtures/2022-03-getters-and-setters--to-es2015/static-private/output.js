var _Foo;
let _initStatic, _call_a, _call_a2;
const dec = () => {};
class Foo {
  static getA() {
    return babelHelpers.classPrivateGetter(Foo, this, _call_a);
  }
  static setA(v) {
    babelHelpers.classPrivateSetter(Foo, _call_a2, this, v);
  }
}
_Foo = Foo;
(() => {
  [_call_a, _call_a2, _initStatic] = babelHelpers.applyDecs2203R(_Foo, [[dec, 8, "a", function () {
    return this.value;
  }], [dec, 9, "a", function (v) {
    this.value = v;
  }]], []).e;
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
