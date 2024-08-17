var _Foo;
let _initStatic, _init_a, _get_a, _set_a, _init_b, _get_b, _set_b;
const dec = () => {};
class Foo {}
_Foo = Foo;
(() => {
  [_init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _initStatic] = babelHelpers.applyDecs2305(_Foo, [[dec, 9, "a", o => babelHelpers.assertClassBrand(_Foo, o, _A)._, (o, v) => _A._ = babelHelpers.assertClassBrand(_Foo, o, v)], [dec, 9, "b", o => babelHelpers.assertClassBrand(_Foo, o, _B)._, (o, v) => _B._ = babelHelpers.assertClassBrand(_Foo, o, v)]], []).e;
  _initStatic(_Foo);
})();
var _A = {
  _: _init_a(_Foo)
};
var _B = {
  _: _init_b(_Foo, 123)
};
