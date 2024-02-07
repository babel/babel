var _initStatic, _init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _Foo;
const dec = () => {};
class Foo {}
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
(() => {
  [_init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _initStatic] = babelHelpers.applyDecs(_Foo, [[dec, 6, "a", function () {
    return babelHelpers.assertClassBrand(this, _Foo, _A)._;
  }, function (value) {
    _A._ = babelHelpers.assertClassBrand(this, _Foo, value);
  }], [dec, 6, "b", function () {
    return babelHelpers.assertClassBrand(this, _Foo, _B)._;
  }, function (value) {
    _B._ = babelHelpers.assertClassBrand(this, _Foo, value);
  }]], []);
  _initStatic(_Foo);
})();
var _A = {
  _: _init_a(_Foo)
};
var _B = {
  _: _init_b(_Foo, 123)
};
