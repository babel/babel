var _obj;
const o = babelHelpers.defineAccessor("get", babelHelpers.objectSpread2(_obj = {}, a), "p", Object.getOwnPropertyDescriptor({
  get p() {
    return babelHelpers.superPropGet(_obj, "x", this);
  }
}, "p").get);
for (let i = 0; o = babelHelpers.objectSpread2((_obj2 => babelHelpers.objectSpread2(_obj2, {}, {
  m() {
    return babelHelpers.superPropGet(_obj2, "x", this);
  }
}))(babelHelpers.defineAccessor("set", babelHelpers.objectSpread2({}, a), "p", Object.getOwnPropertyDescriptor({
  set p(v) {}
}, "p").set)), {}, {
  p: 1
}), i < 1; i++);
