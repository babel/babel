function make(proto, obj = (_obj => babelHelpers.objectSpread2(_obj = {
  __proto__: proto,
  m() {
    return babelHelpers.superPropGet(_obj, "x", this);
  }
}, {}))()) {
  return obj;
}
