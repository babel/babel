var _Foo;
let _initProto, _init_a, _get_a, _set_a, _init_b, _get_b, _set_b;
const dec = () => {};
var _A = /*#__PURE__*/new WeakMap();
var _Foo_brand = /*#__PURE__*/new WeakSet();
var _B = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    babelHelpers.classPrivateFieldInitSpec(this, _A, (_initProto(this), _init_a(this)));
    babelHelpers.classPrivateFieldInitSpec(this, _B, _init_b(this, 123));
  }
}
_Foo = Foo;
[_init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _initProto] = babelHelpers.applyDecs2305(_Foo, [[dec, 1, "a", o => babelHelpers.classPrivateFieldGet2(_A, o), (o, v) => babelHelpers.classPrivateFieldSet2(_A, o, v)], [dec, 1, "b", o => babelHelpers.classPrivateFieldGet2(_B, o), (o, v) => babelHelpers.classPrivateFieldSet2(_B, o, v)]], [], 0, _ => _Foo_brand.has(babelHelpers.checkInRHS(_))).e;
