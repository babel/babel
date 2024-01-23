var _initStatic, _call_a, _Foo;
const dec = () => {};
class Foo {
  static setA(v) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _a, v);
  }
}
_Foo = Foo;
function _set_a(v) {
  _call_a(this, v);
}
var _a = {
  get: void 0,
  set: _set_a
};
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs(_Foo, [[dec, 9, "a", function (v) {
    return this.value = v;
  }]], []);
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
