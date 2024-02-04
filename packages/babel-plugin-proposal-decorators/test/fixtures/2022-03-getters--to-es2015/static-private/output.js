var _initStatic, _call_a, _Foo;
const dec = () => {};
class Foo {
  static getA() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _a);
  }
}
_Foo = Foo;
function _get_a() {
  return _call_a(this);
}
var _a = {
  get: _get_a,
  set: void 0
};
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs2203R(_Foo, [[dec, 8, "a", function () {
    return this.value;
  }]], []).e;
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
