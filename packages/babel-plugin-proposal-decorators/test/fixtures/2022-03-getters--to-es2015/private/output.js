var _initProto, _call_a, _Foo;
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
}
_Foo = Foo;
function _get_a(_this) {
  return _call_a(_this);
}
[_call_a, _initProto] = babelHelpers.applyDecs2203R(_Foo, [[dec, 3, "a", function () {
  return this.value;
}]], []).e;
