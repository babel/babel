var _init_a, _init_b, _Foo;
const dec = () => {};
var _a = /*#__PURE__*/new WeakMap();
var _b = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      writable: true,
      value: _init_a(this)
    });
    babelHelpers.classPrivateFieldInitSpec(this, _b, {
      writable: true,
      value: _init_b(this, 123)
    });
  }
}
_Foo = Foo;
[_init_a, _init_b] = babelHelpers.applyDecs2203R(_Foo, [[dec, 0, "a", function () {
  return babelHelpers.classPrivateFieldGet(this, _a);
}, function (value) {
  babelHelpers.classPrivateFieldSet(this, _a, value);
}], [dec, 0, "b", function () {
  return babelHelpers.classPrivateFieldGet(this, _b);
}, function (value) {
  babelHelpers.classPrivateFieldSet(this, _b, value);
}]], []).e;
