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
  [_init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _initStatic] = babelHelpers.applyDecs2203R(_Foo, [[dec, 6, "a", function () {
    return babelHelpers.assertClassBrand(_Foo, this, _A)._;
  }, function (value) {
    _A._ = babelHelpers.assertClassBrand(_Foo, this, value);
  }], [dec, 6, "b", function () {
    return babelHelpers.assertClassBrand(_Foo, this, _B)._;
  }, function (value) {
    _B._ = babelHelpers.assertClassBrand(_Foo, this, value);
  }]], []).e;
  _initStatic(_Foo);
})();
var _A = {
  _: _init_a(_Foo)
};
var _B = {
  _: _init_b(_Foo, 123)
};
