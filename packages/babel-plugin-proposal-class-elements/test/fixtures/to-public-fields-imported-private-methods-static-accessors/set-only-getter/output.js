var _privateField = babelHelpers.temporalUndefined;

class Cl {
  constructor() {
    Cl, 1, babelHelpers.readOnlyError("#privateFieldValue");
    [(Cl, babelHelpers.readOnlyErrorSet("#privateFieldValue"))._] = [1];
  }

}

_privateField = 0;

function _get_privateFieldValue() {
  return babelHelpers.classCheckPrivateStaticAccess(this, Cl, _privateField);
}

const cl = new Cl();
