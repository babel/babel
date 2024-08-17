var _Foo;
let _initProto, _call_a;
const dec = () => {};
var _Foo_brand = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    babelHelpers.defineProperty(this, "value", (_initProto(this), 1));
  }
  setA(v) {
    babelHelpers.classPrivateSetter(_Foo_brand, _call_a, this, v);
  }
}
_Foo = Foo;
[_call_a, _initProto] = babelHelpers.applyDecs(_Foo, [[dec, 4, "a", function (v) {
  return this.value = v;
}]], []);
