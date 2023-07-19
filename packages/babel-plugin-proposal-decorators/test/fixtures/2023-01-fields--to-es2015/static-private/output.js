var _init_a, _init_b, _class;
const dec = () => {};
class Foo {}
_class = Foo;
[_init_a, _init_b] = babelHelpers.applyDecs2301(_class, [[dec, 5, "a", o => babelHelpers.classStaticPrivateFieldSpecGet(o, _class, _a), (o, v) => babelHelpers.classStaticPrivateFieldSpecSet(o, _class, _a, v)], [dec, 5, "b", o => babelHelpers.classStaticPrivateFieldSpecGet(o, _class, _b), (o, v) => babelHelpers.classStaticPrivateFieldSpecSet(o, _class, _b, v)]], []).e;
var _a = {
  writable: true,
  value: _init_a(_class)
};
var _b = {
  writable: true,
  value: _init_b(_class, 123)
};
