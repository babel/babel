var A = function A() {
  "use strict";

  babelHelpers.classCallCheck(this, A);
};

babelHelpers.defineProperty(A, "prop", 1);

var B = /*#__PURE__*/function (_A) {
  "use strict";

  babelHelpers.inherits(B, _A);

  function B() {
    babelHelpers.classCallCheck(this, B);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(B).apply(this, arguments));
  }

  return B;
}(A);

babelHelpers.defineProperty(B, "prop", 2);
babelHelpers.defineProperty(B, "propA", babelHelpers.get(babelHelpers.getPrototypeOf(B), "prop", B));
babelHelpers.defineProperty(B, "getPropA", () => babelHelpers.get(babelHelpers.getPrototypeOf(B), "prop", B));
