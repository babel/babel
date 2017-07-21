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
const _ref = defunct,
      [{
  a
}, {
  b: _b
}] = _ref,
      b = babelHelpers.objectWithoutProperties(_b, []),
      [,, {
  e
}] = _ref;