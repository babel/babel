var example = obj => {
  var foo = 'foo';
  babelHelpers.objectDestructuringEmpty(obj);
  var _ref = `prefix_${foo}`,
    _ = obj[_ref],
    rest = babelHelpers.objectWithoutProperties(obj, [_ref]);
};
