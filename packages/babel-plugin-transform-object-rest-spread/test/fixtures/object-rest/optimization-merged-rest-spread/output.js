let {
    a
  } = obj,
  rest = babelHelpers.objectWithoutProperties(obj, ["a"]);
let abc = babelHelpers.objectSpread2(rest, {}, {
  c: 123
});
let {
    x
  } = obj2,
  rest2 = babelHelpers.objectWithoutProperties(obj2, ["x"]);
let def = babelHelpers.objectSpread2(babelHelpers.objectSpread2({
  a: 1
}, rest2), {}, {
  b: 2
});
