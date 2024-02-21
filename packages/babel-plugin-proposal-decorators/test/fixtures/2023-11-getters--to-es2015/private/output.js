var _initProto, _call_a, _Foo;
const dec = () => {};
var _Foo_brand = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    babelHelpers.defineProperty(this, "value", (_initProto(this), 1));
  }
  getA() {
    return babelHelpers.classPrivateGetter(this, _Foo_brand, _get_a);
  }
}
_Foo = Foo;
function _get_a() {
  return _call_a(this);
}
[_call_a, _initProto] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 3, "a", function () {
  return this.value;
}]], 0, _ => _Foo_brand.has(babelHelpers.checkInRHS(_))).e;
