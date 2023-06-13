var _call_a, _initStatic, _class;
const dec = () => {};
class Foo {
  static callA() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _a).call(this);
  }
}
_class = Foo;
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs2305(_class, [[dec, 10, "a", function () {
    return this.value;
  }]], []).e;
  _initStatic(_class);
})();
var _a = {
  writable: true,
  value: _call_a
};
babelHelpers.defineProperty(Foo, "value", 1);
