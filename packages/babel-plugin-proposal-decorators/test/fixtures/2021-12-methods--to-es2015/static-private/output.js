var _Foo;
let _initStatic, _call_a;
const dec = () => {};
class Foo {
  static callA() {
    return babelHelpers.assertClassBrand(Foo, this, _a)._.call(this);
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
