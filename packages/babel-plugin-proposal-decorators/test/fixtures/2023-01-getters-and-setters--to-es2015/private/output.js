var _initProto, _call_a, _call_a2, _Foo;
const dec = () => {};
var _Foo_brand = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    babelHelpers.defineProperty(this, "value", (_initProto(this), 1));
  }
  getA() {
    return babelHelpers.classPrivateGetter(_Foo_brand, this, _get_a);
  }
  setA(v) {
    babelHelpers.classPrivateSetter(_Foo_brand, _set_a, this, v);
  }
}
_Foo = Foo;
function _get_a() {
  return _call_a(this);
}
function _set_a(v) {
  _call_a2(this, v);
}
[_call_a, _call_a2, _initProto] = babelHelpers.applyDecs2301(_Foo, [[dec, 3, "a", function () {
  return this.value;
}], [dec, 4, "a", function (v) {
  this.value = v;
}]], [], _ => _Foo_brand.has(babelHelpers.checkInRHS(_))).e;
