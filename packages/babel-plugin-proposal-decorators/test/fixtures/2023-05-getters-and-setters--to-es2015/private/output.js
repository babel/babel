var _Foo;
let _initProto, _call_a, _call_a2;
const dec = () => {};
var _Foo_brand = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    babelHelpers.defineProperty(this, "value", (_initProto(this), 1));
  }
  getA() {
    return babelHelpers.classPrivateGetter(_Foo_brand, this, _call_a);
  }
  setA(v) {
    babelHelpers.classPrivateSetter(_Foo_brand, _call_a2, this, v);
  }
}
_Foo = Foo;
[_call_a, _call_a2, _initProto] = babelHelpers.applyDecs2305(_Foo, [[dec, 3, "a", function () {
  return this.value;
}], [dec, 4, "a", function (v) {
  this.value = v;
}]], [], 0, _ => _Foo_brand.has(babelHelpers.checkInRHS(_))).e;
