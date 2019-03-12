var exfiltrated;

class Cl {
  constructor() {
    if (exfiltrated === undefined) {
      exfiltrated = babelHelpers.classStaticPrivateMethodGet(Cl, Cl, _privateStaticMethod);
    }
  }

}

var _privateStaticMethod = function _privateStaticMethod() {
  return 1017;
};
