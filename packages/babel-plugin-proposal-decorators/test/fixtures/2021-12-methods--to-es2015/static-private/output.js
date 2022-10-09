var _call_a, _initStatic;
const dec = () => {};
class Foo {
  static callA() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _a).call(this);
  }
}
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs(Foo, [[dec, 7, "a", function () {
    return this.value;
  }]], []);
  _initStatic(Foo);
})();
var _a = {
  writable: true,
  value: _call_a
};
babelHelpers.defineProperty(Foo, "value", 1);
