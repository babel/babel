const defunct = [{
  a: 1
}, {
  b: {
    c: 2,
    d: 3
  }
}, {
  e: 4
}];
const _ref2 = defunct,
      [{
  a
}, {
  b: _ref
}] = _ref2,
      b = babelHelpers.objectWithoutProperties(_ref, []),
      [,, {
  e
}] = _ref2;