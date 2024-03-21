var _Foo;
let _init_a, _init_b;
const dec = () => {};
class Foo {}
_Foo = Foo;
[_init_a, _init_b] = babelHelpers.applyDecs(_Foo, [[dec, 5, "a", function () {
  return babelHelpers.assertClassBrand(_Foo, this, _a)._;
}, function (value) {
  _a._ = babelHelpers.assertClassBrand(_Foo, this, value);
}], [dec, 5, "b", function () {
  return babelHelpers.assertClassBrand(_Foo, this, _b)._;
}, function (value) {
  _b._ = babelHelpers.assertClassBrand(_Foo, this, value);
}]], []);
var _a = {
  _: _init_a(_Foo)
};
var _b = {
  _: _init_b(_Foo, 123)
};
