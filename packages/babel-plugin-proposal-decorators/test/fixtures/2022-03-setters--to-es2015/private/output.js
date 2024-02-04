var _initProto, _call_a, _Foo;
const dec = () => {};
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      get: void 0,
      set: _set_a
    });
    babelHelpers.defineProperty(this, "value", (_initProto(this), 1));
  }
  setA(v) {
    babelHelpers.classPrivateFieldSet(this, _a, v);
  }
}
_Foo = Foo;
function _set_a(v) {
  _call_a(this, v);
}
[_call_a, _initProto] = babelHelpers.applyDecs2203R(_Foo, [[dec, 4, "a", function (v) {
  return this.value = v;
}]], []).e;
