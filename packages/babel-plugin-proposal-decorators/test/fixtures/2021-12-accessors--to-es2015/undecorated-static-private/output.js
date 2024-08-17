var _Foo;
const dec = () => {};
class Foo {}
_Foo = Foo;
function _get_a(_this) {
  return babelHelpers.assertClassBrand(_Foo, _this, _A)._;
}
function _set_a(_this2, v) {
  _A._ = babelHelpers.assertClassBrand(_Foo, _this2, v);
}
function _get_b(_this3) {
  return babelHelpers.assertClassBrand(_Foo, _this3, _B)._;
}
function _set_b(_this4, v) {
  _B._ = babelHelpers.assertClassBrand(_Foo, _this4, v);
}
var _A = {
  _: void 0
};
var _B = {
  _: 123
};
