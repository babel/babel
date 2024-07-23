var _B;
var A = /*#__PURE__*/babelHelpers.createClass(function A() {
  "use strict";

  babelHelpers.classCallCheck(this, A);
});
babelHelpers.defineProperty(A, "prop", 1);
var B = /*#__PURE__*/function (_A2) {
  "use strict";

  function B() {
    babelHelpers.classCallCheck(this, B);
    return babelHelpers.callSuper(this, B, arguments);
  }
  babelHelpers.inherits(B, _A2);
  return babelHelpers.createClass(B);
}(A);
_B = B;
babelHelpers.defineProperty(B, "prop", 2);
babelHelpers.defineProperty(B, "propA", babelHelpers.superPropGet(_B, "prop", _B));
babelHelpers.defineProperty(B, "getPropA", () => babelHelpers.superPropGet(_B, "prop", _B));
