function f(_ref) {
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
  let C = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    C: class {
      static saved = this.name;
    }
  }.C;
  return C.saved;
}
function g(_ref2, h = function () {}, a = () => {}) {
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref2), _ref2)), []);
  return [h.name, a.name];
}
