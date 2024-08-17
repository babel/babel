var _Foo;
let _init_a, _init_b;
const dec = () => {};
class Foo {}
_Foo = Foo;
[_init_a, _init_b] = babelHelpers.applyDecs2301(_Foo, [[dec, 5, "a", o => babelHelpers.assertClassBrand(_Foo, o, _a)._, (o, v) => _a._ = babelHelpers.assertClassBrand(_Foo, o, v)], [dec, 5, "b", o => babelHelpers.assertClassBrand(_Foo, o, _b)._, (o, v) => _b._ = babelHelpers.assertClassBrand(_Foo, o, v)]], []).e;
var _a = {
  _: _init_a(_Foo)
};
var _b = {
  _: _init_b(_Foo, 123)
};
