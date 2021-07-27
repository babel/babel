var _PRIVATE_STATIC_FIELD = babelHelpers.temporalUndefined;

class Cl {
  static setPrivateStaticFieldValue() {
    Cl, 1, babelHelpers.readOnlyError("#privateStaticFieldValue");
  }

}

_PRIVATE_STATIC_FIELD = 0;

function _get_privateStaticFieldValue() {
  return babelHelpers.classCheckPrivateStaticAccess(Cl, Cl, _PRIVATE_STATIC_FIELD);
}
