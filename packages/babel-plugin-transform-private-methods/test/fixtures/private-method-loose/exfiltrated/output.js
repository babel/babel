var exfiltrated;
var _privateMethod = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateMethod");
class Foo {
  constructor() {
    Object.defineProperty(this, _privateMethod, {
      value: _privateMethod2
    });
    if (exfiltrated === undefined) {
      exfiltrated = babelHelpers.classPrivateFieldLoose(this, _privateMethod);
    }
  }
}
function _privateMethod2() {}
