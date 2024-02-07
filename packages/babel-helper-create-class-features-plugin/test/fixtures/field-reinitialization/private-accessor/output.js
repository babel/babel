class Base {
  constructor(obj) {
    return obj;
  }
}
var _foo = /*#__PURE__*/new WeakSet();
class Derived extends Base {
  constructor(...args) {
    super(...args);
    babelHelpers.classPrivateMethodInitSpec(this, _foo);
  }
  static get(obj) {
    return babelHelpers.classPrivateGetter(obj, _foo, _get_foo).call(obj);
  }
}
function _get_foo() {
  return 'bar';
}
function _set_foo(value) {
  babelHelpers.classPrivateSetter(this, _foo, _set_foo, value);
}
