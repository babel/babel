var _PRIVATE_STATIC_FIELD = babelHelpers.temporalUndefined;

class Cl {
  static getPrivateStaticFieldValue() {
    return Cl, babelHelpers.writeOnlyError("#privateStaticFieldValue");
  }

}

_PRIVATE_STATIC_FIELD = 0

function _set_privateStaticFieldValue(newValue) {
  babelHelpers.classCheckPrivateStaticAccess(Cl, Cl, _PRIVATE_STATIC_FIELD), _PRIVATE_STATIC_FIELD = newValue;
}
