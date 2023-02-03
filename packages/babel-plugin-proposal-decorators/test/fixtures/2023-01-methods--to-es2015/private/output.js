var _call_a, _initProto;
const dec = () => {};
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor(...args) {
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      writable: true,
      value: _call_a
    });
    babelHelpers.defineProperty(this, "value", 1);
    _initProto(this);
  }
  callA() {
    return babelHelpers.classPrivateFieldGet(this, _a).call(this);
  }
}
[_call_a, _initProto] = babelHelpers.applyDecs2203R(Foo, [[dec, 2, "a", function () {
  return this.value;
}]], []).e;
