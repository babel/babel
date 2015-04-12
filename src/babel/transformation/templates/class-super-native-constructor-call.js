if (SUPER_NAME != null) {
  var NATIVE_REF = new SUPER_NAME(...arguments);
  NATIVE_REF.__proto__ = CLASS_NAME.prototype;
  return NATIVE_REF;
}
