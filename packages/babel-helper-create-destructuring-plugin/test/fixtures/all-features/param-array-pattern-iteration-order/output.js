function f([_ref, [a]]) {
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
  return [r, a];
}
function g([[_ref2], a] = x) {
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref2), _ref2)), []);
  return [r, a];
}
function h(...[a, _ref3]) {
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref3), _ref3)), []);
  return [a, r];
}
