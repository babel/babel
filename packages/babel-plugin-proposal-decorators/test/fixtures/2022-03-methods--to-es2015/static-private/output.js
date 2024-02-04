var _initStatic, _call_a, _Foo;
const dec = () => {};
class Foo {
  static callA() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _a).call(this);
  }
}
_Foo = Foo;
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs2203R(_Foo, [[dec, 7, "a", function () {
    return this.value;
  }]], []).e;
  _initStatic(_Foo);
})();
var _a = {
  writable: true,
  value: _call_a
};
babelHelpers.defineProperty(Foo, "value", 1);
