var _ref2;
function mandatory(paramName) {
  throw new Error(`Missing parameter: ${paramName}`);
}
function foo(_x) {
  return (_ref2 = _ref2 || babelHelpers.asyncToGenerator(function* (_ref) {
    let {
      a,
      b = mandatory("b")
    } = _ref;
    return Promise.resolve(b);
  })).apply(this, arguments);
}
