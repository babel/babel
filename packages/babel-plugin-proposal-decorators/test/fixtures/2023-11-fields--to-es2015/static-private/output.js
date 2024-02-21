var _init_a, _init_extra_a, _init_b, _init_extra_b, _Foo;
const dec = () => {};
class Foo {}
_Foo = Foo;
[_init_a, _init_extra_a, _init_b, _init_extra_b] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 8, "a", o => babelHelpers.assertClassBrand(o, _Foo, _a)._, (o, v) => _a._ = babelHelpers.assertClassBrand(o, _Foo, v)], [dec, 8, "b", o => babelHelpers.assertClassBrand(o, _Foo, _b)._, (o, v) => _b._ = babelHelpers.assertClassBrand(o, _Foo, v)]]).e;
var _a = {
  _: _init_a()
};
var _b = {
  _: (_init_extra_a(), _init_b(123))
};
_init_extra_b();
