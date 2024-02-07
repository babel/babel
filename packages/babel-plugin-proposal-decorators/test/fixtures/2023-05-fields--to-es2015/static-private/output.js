var _init_a, _init_b, _Foo;
const dec = () => {};
class Foo {}
_Foo = Foo;
[_init_a, _init_b] = babelHelpers.applyDecs2305(_Foo, [[dec, 8, "a", o => babelHelpers.assertClassBrand(o, _Foo, _a)._, (o, v) => _a._ = babelHelpers.assertClassBrand(o, _Foo, v)], [dec, 8, "b", o => babelHelpers.assertClassBrand(o, _Foo, _b)._, (o, v) => _b._ = babelHelpers.assertClassBrand(o, _Foo, v)]], []).e;
var _a = {
  _: _init_a(_Foo)
};
var _b = {
  _: _init_b(_Foo, 123)
};
