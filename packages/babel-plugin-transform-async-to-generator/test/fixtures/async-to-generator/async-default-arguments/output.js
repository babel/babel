function mandatory(paramName) {
  throw new Error(`Missing parameter: ${paramName}`);
}

function _foo() {
  _foo = babelHelpers.asyncToGenerator(function* foo(_ref) {
    let {
      a,
      b = mandatory("b")
    } = _ref;
    return Promise.resolve(b);
  });
  return _foo.apply(this, arguments);
}

function foo(_x) {
  return _foo.apply(this, arguments);
}
