var _init_a, _get_a, _set_a, _init_extra_a, _init_b, _get_b, _set_b, _init_extra_b, _Foo;
const dec = () => {};
class Foo {}
_Foo = Foo;
function _set_a2(v) {
  _set_a(v);
}
function _get_a2() {
  return _get_a();
}
function _set_b2(v) {
  _set_b(v);
}
function _get_b2() {
  return _get_b();
}
[_init_a, _get_a, _set_a, _init_extra_a, _init_b, _get_b, _set_b, _init_extra_b] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 9, "a", o => babelHelpers.assertClassBrand(o, _Foo, _A)._, (o, v) => _A._ = babelHelpers.assertClassBrand(o, _Foo, v)], [dec, 9, "b", o => babelHelpers.assertClassBrand(o, _Foo, _B)._, (o, v) => _B._ = babelHelpers.assertClassBrand(o, _Foo, v)]]).e;
var _A = {
  _: _init_a()
};
var _B = {
  _: (_init_extra_a(), _init_b(123))
};
_init_extra_b();
