function mandatory(paramName) {
  throw new Error(`Missing parameter: ${paramName}`);
}
function foo(_x) {
  return (foo = babelHelpers.asyncToGenerator(function* (_ref) {
    let {
      a,
      b = mandatory("b")
    } = _ref;
    return Promise.resolve(b);
  })).apply(this, arguments);
}
