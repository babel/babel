const _source = source;
babelHelpers.objectDestructuringEmpty(_source);
const rest = babelHelpers.objectWithoutProperties(_source, ["a"]);
const _source2 = source,
  all = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_source2), _source2));
