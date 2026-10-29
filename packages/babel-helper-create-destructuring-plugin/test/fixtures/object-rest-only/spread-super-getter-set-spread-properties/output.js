var _obj;
const o = Object.assign(Object.assign(_obj = {}, a), {}, {
  get p() {
    return babelHelpers.superPropGet(_obj, "x", this);
  }
});
for (let i = 0; o = babelHelpers.objectSpread2((_obj2 => babelHelpers.objectSpread2(_obj2, {}, {
  m() {
    return babelHelpers.superPropGet(_obj2, "x", this);
  }
}))((_obj2 => babelHelpers.defineAccessor("set", _obj2, "p", Object.getOwnPropertyDescriptor({
  set p(v) {}
}, "p").set))(babelHelpers.objectSpread2({}, a))), {}, {
  p: 1
}), i < 1; i++);
