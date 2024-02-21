var _initStatic, _call_a, _Foo;
const dec = () => {};
class Foo {
  static callA() {
    return babelHelpers.assertClassBrand(this, Foo, _a)._.call(this);
  }
}
_Foo = Foo;
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 10, "a", function () {
    return this.value;
  }]]).e;
  _initStatic(_Foo);
})();
var _a = {
  _: _call_a
};
babelHelpers.defineProperty(Foo, "value", 1);
