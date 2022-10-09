var _init_a, _init_b;
const dec = () => {};
class Foo {}
[_init_a, _init_b] = babelHelpers.applyDecs(Foo, [[dec, 5, "a", function () {
  return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _a);
}, function (value) {
  babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _a, value);
}], [dec, 5, "b", function () {
  return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _b);
}, function (value) {
  babelHelpers.classStaticPrivateFieldSpecSet(this, Foo, _b, value);
}]], []);
var _a = {
  writable: true,
  value: _init_a(Foo)
};
var _b = {
  writable: true,
  value: _init_b(Foo, 123)
};
