var _Foo;
const dec = () => {};
class Foo {}
_Foo = Foo;
function _get_a() {
  return babelHelpers.assertClassBrand(this, _Foo, _A)._;
}
function _set_a(v) {
  _A._ = babelHelpers.assertClassBrand(this, _Foo, v);
}
function _get_b() {
  return babelHelpers.assertClassBrand(this, _Foo, _B)._;
}
function _set_b(v) {
  _B._ = babelHelpers.assertClassBrand(this, _Foo, v);
}
var _A = {
  _: void 0
};
var _B = {
  _: 123
};
