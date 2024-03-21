var _Foo;
let _initProto, _call_a;
const dec = () => {};
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, _call_a);
    babelHelpers.defineProperty(this, "value", (_initProto(this), 1));
  }
  callA() {
    return babelHelpers.classPrivateFieldGet2(_a, this).call(this);
  }
}
_Foo = Foo;
[_call_a, _initProto] = babelHelpers.applyDecs(_Foo, [[dec, 2, "a", function () {
  return this.value;
}]], []);
