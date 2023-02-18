var _call_a, _initProto;
const dec = () => {};
var _a = /*#__PURE__*/new WeakMap();
class Foo {
  constructor(...args) {
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      get: void 0,
      set: _set_a
    });
    babelHelpers.defineProperty(this, "value", 1);
    _initProto(this);
  }
  setA(v) {
    babelHelpers.classPrivateFieldSet(this, _a, v);
  }
}
function _set_a(v) {
  _call_a(this, v);
}
[_call_a, _initProto] = babelHelpers.applyDecs2301(Foo, [[dec, 4, "a", function (v) {
  return this.value = v;
}]], [], _ => _a.has(babelHelpers.checkInRHS(_))).e;
