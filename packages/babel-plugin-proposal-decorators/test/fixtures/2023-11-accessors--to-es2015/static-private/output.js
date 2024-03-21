var _Foo;
let _init_a, _get_a, _set_a, _init_extra_a, _init_b, _get_b, _set_b, _init_extra_b;
const dec = () => {};
class Foo {}
_Foo = Foo;
function _set_a2(_this, v) {
  _set_a(v);
}
function _get_a2(_this2) {
  return _get_a();
}
function _set_b2(_this3, v) {
  _set_b(v);
}
function _get_b2(_this4) {
  return _get_b();
}
[_init_a, _get_a, _set_a, _init_extra_a, _init_b, _get_b, _set_b, _init_extra_b] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 9, "a", o => babelHelpers.assertClassBrand(_Foo, o, _A)._, (o, v) => _A._ = babelHelpers.assertClassBrand(_Foo, o, v)], [dec, 9, "b", o => babelHelpers.assertClassBrand(_Foo, o, _B)._, (o, v) => _B._ = babelHelpers.assertClassBrand(_Foo, o, v)]]).e;
var _A = {
  _: _init_a()
};
var _B = {
  _: (_init_extra_a(), _init_b(123))
};
_init_extra_b();
