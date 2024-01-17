var A = /*#__PURE__*/babelHelpers.createClass(function A() {
  "use strict";

  babelHelpers.classCallCheck(this, A);
});
A.prop = 1;
var B = /*#__PURE__*/function (_A2) {
  "use strict";

  babelHelpers.inherits(B, _A2);
  function B() {
    babelHelpers.classCallCheck(this, B);
    return babelHelpers.callSuper(this, B, arguments);
  }
  return babelHelpers.createClass(B);
}(A);
B.prop = 2;
B.propA = A.prop;
B.getPropA = () => A.prop;
