function f(this: Foo, _ref) {
  let a = babelHelpers.objectWithoutProperties((babelHelpers.objectDestructuringEmpty(_ref), _ref), []);
  let b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : a;
  return arguments.length <= 2 ? undefined : arguments[2];
}
