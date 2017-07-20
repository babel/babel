const defunct = {
  outer: {
    inner: {
      three: 'three',
      four: 'four'
    }
  }
};
const {
  outer: {
    inner: _ref
  }
} = defunct,
      {
  three
} = _ref,
      other = babelHelpers.objectWithoutProperties(_ref, ["three"]);