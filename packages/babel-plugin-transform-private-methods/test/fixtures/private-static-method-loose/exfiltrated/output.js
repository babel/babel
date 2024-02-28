var exfiltrated;
var _privateStaticMethod = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateStaticMethod");
class Cl {
  constructor() {
    if (exfiltrated === undefined) {
      exfiltrated = babelHelpers.classPrivateFieldLoose(Cl, _privateStaticMethod);
    }
  }
}
function _privateStaticMethod2() {
  return 1017;
}
Object.defineProperty(Cl, _privateStaticMethod, {
  value: _privateStaticMethod2
});
