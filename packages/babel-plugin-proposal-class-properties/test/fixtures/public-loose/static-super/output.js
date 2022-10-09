var A = /*#__PURE__*/babelHelpers.createClass(function A() {
  "use strict";

  babelHelpers.classCallCheck(this, A);
});
A.prop = 1;
var B = /*#__PURE__*/function (_A) {
  "use strict";

  babelHelpers.inherits(B, _A);
  var _super = babelHelpers.createSuper(B);
  function B() {
    babelHelpers.classCallCheck(this, B);
    return _super.apply(this, arguments);
  }
  return babelHelpers.createClass(B);
}(A);
B.prop = 2;
B.propA = A.prop;
B.getPropA = () => A.prop;
