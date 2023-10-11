var _init_a, _init_b, _class;
const dec = () => {};
class Foo {}
_class = Foo;
[_init_a, _init_b] = babelHelpers.applyDecs(_class, [[dec, 5, "a", function () {
  return babelHelpers.classStaticPrivateFieldSpecGet(this, _class, _a);
}, function (value) {
  babelHelpers.classStaticPrivateFieldSpecSet(this, _class, _a, value);
}], [dec, 5, "b", function () {
  return babelHelpers.classStaticPrivateFieldSpecGet(this, _class, _b);
}, function (value) {
  babelHelpers.classStaticPrivateFieldSpecSet(this, _class, _b, value);
}]], []);
var _a = {
  writable: true,
  value: _init_a(_class)
};
var _b = {
  writable: true,
  value: _init_b(_class, 123)
};
