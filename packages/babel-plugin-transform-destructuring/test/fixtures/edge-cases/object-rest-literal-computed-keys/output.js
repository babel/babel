const _obj = obj,
  a = _obj[true],
  b = _obj[null],
  c = _obj[-1],
  rest = babelHelpers.objectWithoutProperties(_obj, ["true", "null", -1].map(babelHelpers.toPropertyKey));
const _obj2 = obj,
  o = _obj2["other"],
  rest3 = babelHelpers.objectWithoutProperties(_obj2, ["other"]);
var _obj3 = obj;
d = _obj3[-1];
e = _obj3[!0];
rest2 = babelHelpers.objectWithoutProperties(_obj3, [-1, !0].map(babelHelpers.toPropertyKey));
_obj3;
