var exfiltrated;

var _privateStaticMethod = babelHelpers.classPrivateFieldLooseKey("privateStaticMethod");

class Cl {
  constructor() {
    if (exfiltrated === undefined) {
      exfiltrated = babelHelpers.classPrivateFieldLooseBase(Cl, _privateStaticMethod)[_privateStaticMethod];
    }
  }

}

var _privateStaticMethod2 = function _privateStaticMethod2() {
  return 1017;
};

Object.defineProperty(Cl, _privateStaticMethod, {
  value: _privateStaticMethod2
});
