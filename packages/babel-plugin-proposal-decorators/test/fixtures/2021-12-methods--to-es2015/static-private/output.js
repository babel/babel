var _initStatic, _call_a, _Foo;
const dec = () => {};
class Foo {
  static callA() {
    return babelHelpers.assertClassBrand(this, Foo, _a)._.call(this);
  }
}
_Foo = Foo;
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs(_Foo, [[dec, 7, "a", function () {
    return this.value;
  }]], []);
  _initStatic(_Foo);
})();
var _a = {
  _: _call_a
};
babelHelpers.defineProperty(Foo, "value", 1);
