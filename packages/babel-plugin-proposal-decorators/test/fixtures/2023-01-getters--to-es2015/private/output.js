var _call_a, _initProto;
const dec = () => {};
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor(...args) {
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      get: _get_a,
      set: void 0
    });
    babelHelpers.defineProperty(this, "value", 1);
    _initProto(this);
  }
  getA() {
    return babelHelpers.classPrivateFieldGet(this, _a);
  }
}
function _get_a() {
  return _call_a(this);
}
[_call_a, _initProto] = babelHelpers.applyDecs2301(Foo, [[dec, 3, "a", function () {
  return this.value;
}]], [], _ => _a.has(babelHelpers.checkInRHS(_))).e;
