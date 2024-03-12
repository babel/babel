var _Foo;
let _initStatic, _call_a;
const dec = () => {};
class Foo {
  static getA() {
    return babelHelpers.classPrivateGetter(Foo, this, _call_a);
  }
}
_Foo = Foo;
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs(_Foo, [[dec, 8, "a", function () {
    return this.value;
  }]], []);
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
