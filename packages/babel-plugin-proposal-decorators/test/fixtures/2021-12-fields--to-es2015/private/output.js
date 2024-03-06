var _Foo;
let _init_a, _init_b;
const dec = () => {};
var _a = /*#__PURE__*/new WeakMap();
var _b = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _a, _init_a(this));
    babelHelpers.classPrivateFieldInitSpec(this, _b, _init_b(this, 123));
  }
}
_Foo = Foo;
[_init_a, _init_b] = babelHelpers.applyDecs(_Foo, [[dec, 0, "a", function () {
  return babelHelpers.classPrivateFieldGet2(_a, this);
}, function (value) {
  babelHelpers.classPrivateFieldSet2(_a, this, value);
}], [dec, 0, "b", function () {
  return babelHelpers.classPrivateFieldGet2(_b, this);
}, function (value) {
  babelHelpers.classPrivateFieldSet2(_b, this, value);
}]], []);
