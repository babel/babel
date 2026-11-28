const _source = source;
babelHelpers.objectDestructuringEmpty(_source);
const rest = babelHelpers.objectWithoutProperties(_source, ["a"]);
const _source2 = source,
  all = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_source2), _source2)), []);
