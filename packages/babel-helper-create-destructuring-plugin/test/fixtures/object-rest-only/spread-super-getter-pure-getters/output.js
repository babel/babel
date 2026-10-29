var _obj;
const o = babelHelpers.objectSpread2(_obj = {}, a, b, {
  get p() {
    return babelHelpers.superPropGet(_obj, "x", this);
  }
});
