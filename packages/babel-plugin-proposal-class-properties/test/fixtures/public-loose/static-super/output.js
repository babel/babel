var A = function A() {
  "use strict";

  babelHelpers.classCallCheck(this, A);
};

A.prop = 1;

var B =
/*#__PURE__*/
function (_A) {
  "use strict";

  babelHelpers.inherits(B, _A);

  function B() {
    babelHelpers.classCallCheck(this, B);
    return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(B).apply(this, arguments));
  }

  return B;
}(A);

B.prop = 2;
B.propA = A.prop;

B.getPropA = () => A.prop;
