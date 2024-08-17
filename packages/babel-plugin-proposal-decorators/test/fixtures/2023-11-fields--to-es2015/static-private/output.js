var _Foo;
let _init_a, _init_extra_a, _init_b, _init_extra_b;
const dec = () => {};
class Foo {}
_Foo = Foo;
[_init_a, _init_extra_a, _init_b, _init_extra_b] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 8, "a", o => babelHelpers.assertClassBrand(_Foo, o, _a)._, (o, v) => _a._ = babelHelpers.assertClassBrand(_Foo, o, v)], [dec, 8, "b", o => babelHelpers.assertClassBrand(_Foo, o, _b)._, (o, v) => _b._ = babelHelpers.assertClassBrand(_Foo, o, v)]]).e;
var _a = {
  _: _init_a()
};
var _b = {
  _: (_init_extra_a(), _init_b(123))
};
_init_extra_b();
