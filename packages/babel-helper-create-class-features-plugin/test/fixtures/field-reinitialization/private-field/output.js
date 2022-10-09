class Base {
  constructor(obj) {
    return obj;
  }
}
let counter = 0;
var _foo = /*#__PURE__*/new WeakMap();
class Derived extends Base {
  constructor(...args) {
    super(...args);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, {
      writable: true,
      value: ++counter
    });
  }
  static get(obj) {
    return babelHelpers.classPrivateFieldGet(obj, _foo);
  }
}
