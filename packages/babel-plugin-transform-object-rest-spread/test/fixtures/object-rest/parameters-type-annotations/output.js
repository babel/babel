function f(_ref: {
  [key: string]: number;
}) {
  let a = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
  let b: typeof a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : a;
}
function g<T extends object>(_ref2: T, _ref3: T[]) {
  let a = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref2), _ref2)), []);
  let [b] = _ref3;
}
