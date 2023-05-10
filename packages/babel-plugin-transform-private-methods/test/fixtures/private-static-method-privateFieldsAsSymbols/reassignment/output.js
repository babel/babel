var _privateStaticMethod = /*#__PURE__*/Symbol("privateStaticMethod");
class Cl {
  constructor() {
    babelHelpers.classPrivateFieldLooseBase(Cl, _privateStaticMethod)[_privateStaticMethod] = null;
  }
}
function _privateStaticMethod2() {}
Object.defineProperty(Cl, _privateStaticMethod, {
  value: _privateStaticMethod2
});
new Cl();
