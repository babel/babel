var _init_a, _init_b, _Foo;
const dec = () => {};
var _a = /*#__PURE__*/new WeakMap();
var _b = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, _init_a(this));
    babelHelpers.classPrivateFieldInitSpec(this, _b, _init_b(this, 123));
  }
}
_Foo = Foo;
[_init_a, _init_b] = babelHelpers.applyDecs2301(_Foo, [[dec, 0, "a", o => babelHelpers.classPrivateFieldGet2(o, _a), (o, v) => babelHelpers.classPrivateFieldSet2(o, _a, v)], [dec, 0, "b", o => babelHelpers.classPrivateFieldGet2(o, _b), (o, v) => babelHelpers.classPrivateFieldSet2(o, _b, v)]], [], _ => _b.has(babelHelpers.checkInRHS(_))).e;
