// foo property access should be removed
const rest = babelHelpers.objectWithoutProperties({}, ["foo"]);
