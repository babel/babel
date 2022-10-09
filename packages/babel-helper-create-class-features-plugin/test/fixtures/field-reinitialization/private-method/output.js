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
    return babelHelpers.classPrivateMethodGet(obj, _foo, _foo2).call(obj);
  }
}
function _foo2() {
  return 'bar';
}
