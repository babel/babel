var _class;
const dec = () => {};
class Foo {}
_class = Foo;
function _get_a() {
  return babelHelpers.classStaticPrivateFieldSpecGet(this, _class, _A);
}
function _set_a(v) {
  babelHelpers.classStaticPrivateFieldSpecSet(this, _class, _A, v);
}
function _get_b() {
  return babelHelpers.classStaticPrivateFieldSpecGet(this, _class, _B);
}
function _set_b(v) {
  babelHelpers.classStaticPrivateFieldSpecSet(this, _class, _B, v);
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
