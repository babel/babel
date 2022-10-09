class Base {
  constructor(obj) {
    return obj;
  }
}
var _foo = /*#__PURE__*/new WeakMap();
class Derived extends Base {
  constructor(...args) {
    super(...args);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, {
      get: _get_foo,
      set: _set_foo
    });
  }
  static get(obj) {
    return babelHelpers.classPrivateFieldGet(obj, _foo).call(obj);
  }
}
function _get_foo() {
  return 'bar';
}
function _set_foo(value) {
  babelHelpers.classPrivateFieldSet(this, _foo, value);
}
