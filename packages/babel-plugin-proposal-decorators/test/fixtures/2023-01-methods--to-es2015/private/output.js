var _initProto, _call_a, _Foo;
const dec = () => {};
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      writable: true,
      value: _call_a
    });
    babelHelpers.defineProperty(this, "value", (_initProto(this), 1));
  }
  callA() {
    return babelHelpers.classPrivateFieldGet(this, _a).call(this);
  }
}
_Foo = Foo;
[_call_a, _initProto] = babelHelpers.applyDecs2301(_Foo, [[dec, 2, "a", function () {
  return this.value;
}]], [], _ => _a.has(babelHelpers.checkInRHS(_))).e;
