var _initProto, _call_a, _Foo;
const dec = () => {};
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      get: _get_a,
      set: void 0
    });
    babelHelpers.defineProperty(this, "value", (_initProto(this), 1));
  }
  getA() {
    return babelHelpers.classPrivateFieldGet(this, _a);
  }
}
_Foo = Foo;
function _get_a() {
  return _call_a(this);
}
[_call_a, _initProto] = babelHelpers.applyDecs2305(_Foo, [[dec, 3, "a", function () {
  return this.value;
}]], [], 0, _ => _a.has(babelHelpers.checkInRHS(_))).e;
