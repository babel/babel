var _Foo;
let _initStatic, _init_a, _get_a, _set_a, _init_b, _get_b, _set_b;
const dec = () => {};
class Foo {}
_Foo = Foo;
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
