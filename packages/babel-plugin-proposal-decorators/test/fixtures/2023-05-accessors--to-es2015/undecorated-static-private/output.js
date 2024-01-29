var _Foo;
const dec = () => {};
class Foo {}
_Foo = Foo;
function _get_a() {
  return babelHelpers.classStaticPrivateFieldSpecGet(_Foo, _Foo, _A);
}
function _set_a(v) {
  babelHelpers.classStaticPrivateFieldSpecSet(_Foo, _Foo, _A, v);
}
function _get_b() {
  return babelHelpers.classStaticPrivateFieldSpecGet(_Foo, _Foo, _B);
}
function _set_b(v) {
  babelHelpers.classStaticPrivateFieldSpecSet(_Foo, _Foo, _B, v);
}
var _b = {
  get: _get_b,
  set: _set_b
};
var _a = {
  get: _get_a,
  set: _set_a
};
var _A = {
  writable: true,
  value: void 0
};
var _B = {
  writable: true,
  value: 123
};
