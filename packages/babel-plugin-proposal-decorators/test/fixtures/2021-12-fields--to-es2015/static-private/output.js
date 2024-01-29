var _init_a, _init_b, _Foo;
const dec = () => {};
class Foo {}
_Foo = Foo;
[_init_a, _init_b] = babelHelpers.applyDecs(_Foo, [[dec, 5, "a", function () {
  return babelHelpers.classStaticPrivateFieldSpecGet(this, _Foo, _a);
}, function (value) {
  babelHelpers.classStaticPrivateFieldSpecSet(this, _Foo, _a, value);
}], [dec, 5, "b", function () {
  return babelHelpers.classStaticPrivateFieldSpecGet(this, _Foo, _b);
}, function (value) {
  babelHelpers.classStaticPrivateFieldSpecSet(this, _Foo, _b, value);
}]], []);
var _a = {
  writable: true,
  value: _init_a(_Foo)
};
var _b = {
  writable: true,
  value: _init_b(_Foo, 123)
};
