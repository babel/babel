var _init_a, _get_a, _set_a, _init_extra_a, _init_b, _get_b, _set_b, _init_extra_b, _Foo;
const dec = () => {};
var _A = /*#__PURE__*/new WeakMap();
var _Foo_brand = /*#__PURE__*/new WeakSet();
var _B = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    babelHelpers.classPrivateFieldInitSpec(this, _A, _init_a(this));
    babelHelpers.classPrivateFieldInitSpec(this, _B, (_init_extra_a(this), _init_b(this, 123)));
    _init_extra_b(this);
  }
}
_Foo = Foo;
function _set_a2(v) {
  _set_a(this, v);
}
function _get_a2() {
  return _get_a(this);
}
function _set_b2(v) {
  _set_b(this, v);
}
function _get_b2() {
  return _get_b(this);
}
[_init_a, _get_a, _set_a, _init_extra_a, _init_b, _get_b, _set_b, _init_extra_b] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 1, "a", o => babelHelpers.classPrivateFieldGet2(o, _A), (o, v) => babelHelpers.classPrivateFieldSet2(o, _A, v)], [dec, 1, "b", o => babelHelpers.classPrivateFieldGet2(o, _B), (o, v) => babelHelpers.classPrivateFieldSet2(o, _B, v)]], 0, _ => _Foo_brand.has(babelHelpers.checkInRHS(_))).e;
