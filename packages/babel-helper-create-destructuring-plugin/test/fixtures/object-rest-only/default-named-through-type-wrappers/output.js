function f(_ref) {
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
  let C = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    C: class {
      static saved = this.name;
    }
  }.C;
  return C.saved;
}
const _ref2 = {},
  {
    h = function () {}
  } = _ref2,
  rest = babelHelpers.objectWithoutProperties(_ref2, ["h"]);
