var _Foo;
let _initProto, _call_a;
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
}
_Foo = Foo;
[_call_a, _initProto] = babelHelpers.applyDecs(_Foo, [[dec, 3, "a", function () {
  return this.value;
}]], []);
