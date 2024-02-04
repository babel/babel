var _initStatic, _init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _Foo;
const dec = () => {};
var _a = /*#__PURE__*/new WeakMap();
var _b = /*#__PURE__*/new WeakMap();
class Foo {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _b, {
      get: _get_b2,
      set: _set_b2
    });
    babelHelpers.classPrivateFieldInitSpec(this, _a, {
      get: _get_a2,
      set: _set_a2
    });
  }
}
_Foo = Foo;
function _set_a2(v) {
  _set_a(this, v);
}
function _get_a2() {
  return _get_a(this);
}
function _set_b2(v) {
  _set_b(this, v);
}
function _get_b2() {
  return _get_b(this);
}
(() => {
  [_init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _initStatic] = babelHelpers.applyDecs(_Foo, [[dec, 6, "a", function () {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, _Foo, _A);
  }, function (value) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, _Foo, _A, value);
  }], [dec, 6, "b", function () {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, _Foo, _B);
  }, function (value) {
    babelHelpers.classStaticPrivateFieldSpecSet(this, _Foo, _B, value);
  }]], []);
  _initStatic(_Foo);
})();
var _A = {
  writable: true,
  value: _init_a(_Foo)
};
var _B = {
  writable: true,
  value: _init_b(_Foo, 123)
};
