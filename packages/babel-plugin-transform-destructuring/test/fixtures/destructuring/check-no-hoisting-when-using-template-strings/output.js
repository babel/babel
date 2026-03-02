var example = obj => {
  var foo = 'foo';
  var _ = obj[`prefix_${foo}`],
      rest = babelHelpers.objectWithoutProperties(obj, [`prefix_${foo}`]);
};
