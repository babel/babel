var _obj;
const obj = _obj = {
  as() {
    return babelHelpers.superPropGet(_obj, "m", this, 2)([]);
  },
  nonNull() {
    return babelHelpers.superPropGet(_obj, "m", this, 2)([]);
  },
  optional() {
    return babelHelpers.superPropGet(_obj, "m", this, 2)?.([]);
  }
};
