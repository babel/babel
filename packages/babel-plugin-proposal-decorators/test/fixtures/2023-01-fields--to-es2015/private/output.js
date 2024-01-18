var _init_a, _init_b, _Foo;
const dec = () => {};
var _a = /*#__PURE__*/new WeakMap();
var _b = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      writable: true,
      value: _init_a(this)
    });
    babelHelpers.classPrivateFieldInitSpec(this, _b, {
      writable: true,
      value: _init_b(this, 123)
    });
  }
}
_Foo = Foo;
[_init_a, _init_b] = babelHelpers.applyDecs2301(_Foo, [[dec, 0, "a", o => babelHelpers.classPrivateFieldGet(o, _a), (o, v) => babelHelpers.classPrivateFieldSet(o, _a, v)], [dec, 0, "b", o => babelHelpers.classPrivateFieldGet(o, _b), (o, v) => babelHelpers.classPrivateFieldSet(o, _b, v)]], [], _ => _b.has(babelHelpers.checkInRHS(_))).e;
