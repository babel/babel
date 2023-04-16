var _init_a, _init_b;
const dec = () => {};
class Foo {}
[_init_a, _init_b] = babelHelpers.applyDecs2303(Foo, [[[0, dec], 5, "a", o => babelHelpers.classStaticPrivateFieldSpecGet(o, Foo, _a), (o, v) => babelHelpers.classStaticPrivateFieldSpecSet(o, Foo, _a, v)], [[0, dec], 5, "b", o => babelHelpers.classStaticPrivateFieldSpecGet(o, Foo, _b), (o, v) => babelHelpers.classStaticPrivateFieldSpecSet(o, Foo, _b, v)]], []).e;
var _a = {
  writable: true,
  value: _init_a(Foo)
};
var _b = {
  writable: true,
  value: _init_b(Foo, 123)
};
