const _obj = obj,
  a = _obj.a,
  rest = babelHelpers.objectWithoutProperties(_obj, ["a"]);
export { a, rest };
const b = babelHelpers.slicedToArray(a, 1)[0];
export { b };
use(a, b, rest);
