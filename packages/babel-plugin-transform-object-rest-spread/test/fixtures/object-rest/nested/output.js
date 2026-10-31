const defunct = {
  outer: {
    inner: {
      three: 'three',
      four: 'four'
    }
  }
};
const _defunct$outer$inner = defunct.outer.inner,
  {
    three
  } = _defunct$outer$inner,
  other = babelHelpers.objectWithoutProperties(_defunct$outer$inner, ["three"]);
