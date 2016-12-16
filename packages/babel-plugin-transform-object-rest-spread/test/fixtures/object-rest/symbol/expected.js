const _Symbol$for = Symbol.for("foo");

const {
  [_Symbol$for]: foo
} = {};
const rest = babelHelpers.objectWithoutProperties({}, [_Symbol$for]);
