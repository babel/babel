var _obj;
const proto = {
  x: 7
};
const obj = babelHelpers.objectSpread2(babelHelpers.setPrototypeOf(babelHelpers.objectSpread2(_obj = {}, {}), babelHelpers.getPrototypeOf({
  __proto__: proto
})), {}, {
  m() {
    return babelHelpers.superPropGet(_obj, "x", this);
  }
});
obj.m();
