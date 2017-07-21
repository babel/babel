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
    inner: _three$other
  }
} = defunct,
      {
  three
} = _three$other,
      other = babelHelpers.objectWithoutProperties(_three$other, ["three"]);