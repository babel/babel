var _initStatic, _init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _Foo;
const dec = () => {};
class Foo {}
_Foo = Foo;
function _set_a2(_this, v) {
  _set_a(_this, v);
}
function _get_a2(_this2) {
  return _get_a(_this2);
}
function _set_b2(_this3, v) {
  _set_b(_this3, v);
}
function _get_b2(_this4) {
  return _get_b(_this4);
}
(() => {
  [_init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _initStatic] = babelHelpers.applyDecs2305(_Foo, [[dec, 9, "a", o => babelHelpers.assertClassBrand(_Foo, o, _A)._, (o, v) => _A._ = babelHelpers.assertClassBrand(_Foo, o, v)], [dec, 9, "b", o => babelHelpers.assertClassBrand(_Foo, o, _B)._, (o, v) => _B._ = babelHelpers.assertClassBrand(_Foo, o, v)]], []).e;
  _initStatic(_Foo);
})();
var _A = {
  _: _init_a(_Foo)
};
var _B = {
  _: _init_b(_Foo, 123)
};
