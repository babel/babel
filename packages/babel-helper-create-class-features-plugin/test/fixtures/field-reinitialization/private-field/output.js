class Base {
  constructor(obj) {
    return obj;
  }
}
let counter = 0;
var _foo = /*#__PURE__*/new WeakMap();
class Derived extends Base {
  constructor() {
    super(...arguments);
    babelHelpers.classPrivateFieldInitSpec(this, _foo, ++counter);
  }
  static get(obj) {
    return babelHelpers.classPrivateFieldGet2(_foo, obj);
  }
}
