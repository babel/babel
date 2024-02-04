var _initStatic, _call_a, _call_a2, _Foo;
const dec = () => {};
class Foo {
  static getA() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _a);
  }
  static setA(v) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _a, v);
  }
}
_Foo = Foo;
function _get_a() {
  return _call_a(this);
}
function _set_a(v) {
  _call_a2(this, v);
}
var _a = {
  get: _get_a,
  set: _set_a
};
(() => {
  [_call_a, _call_a2, _initStatic] = babelHelpers.applyDecs2301(_Foo, [[dec, 8, "a", function () {
    return this.value;
  }], [dec, 9, "a", function (v) {
    this.value = v;
  }]], []).e;
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
