var _init_a, _init_b, _Foo;
const dec = () => {};
class Foo {}
_Foo = Foo;
[_init_a, _init_b] = babelHelpers.applyDecs2305(_Foo, [[dec, 8, "a", o => babelHelpers.classStaticPrivateFieldSpecGet(o, _Foo, _a), (o, v) => babelHelpers.classStaticPrivateFieldSpecSet(o, _Foo, _a, v)], [dec, 8, "b", o => babelHelpers.classStaticPrivateFieldSpecGet(o, _Foo, _b), (o, v) => babelHelpers.classStaticPrivateFieldSpecSet(o, _Foo, _b, v)]], []).e;
var _a = {
  writable: true,
  value: _init_a(_Foo)
};
var _b = {
  writable: true,
  value: _init_b(_Foo, 123)
};
