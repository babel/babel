var _init_a, _init_b, _Foo;
const dec = () => {};
class Foo {}
_Foo = Foo;
[_init_a, _init_b] = babelHelpers.applyDecs2203R(_Foo, [[dec, 5, "a", function () {
  return babelHelpers.assertClassBrand(this, _Foo, _a)._;
}, function (value) {
  _a._ = babelHelpers.assertClassBrand(this, _Foo, value);
}], [dec, 5, "b", function () {
  return babelHelpers.assertClassBrand(this, _Foo, _b)._;
}, function (value) {
  _b._ = babelHelpers.assertClassBrand(this, _Foo, value);
}]], []).e;
var _a = {
  _: _init_a(_Foo)
};
var _b = {
  _: _init_b(_Foo, 123)
};
