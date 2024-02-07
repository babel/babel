var _initProto, _call_a, _call_a2, _Foo;
const dec = () => {};
var _a = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _a);
    babelHelpers.defineProperty(this, "value", (_initProto(this), 1));
  }
  getA() {
    return babelHelpers.classPrivateGetter(this, _a, _get_a);
  }
  setA(v) {
    babelHelpers.classPrivateSetter(this, _a, _set_a, v);
  }
}
_Foo = Foo;
function _get_a() {
  return _call_a(this);
}
function _set_a(v) {
  _call_a2(this, v);
}
[_call_a, _call_a2, _initProto] = babelHelpers.applyDecs2305(_Foo, [[dec, 3, "a", function () {
  return this.value;
}], [dec, 4, "a", function (v) {
  this.value = v;
}]], [], 0, _ => _a.has(babelHelpers.checkInRHS(_))).e;
