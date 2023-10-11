var _class2;
var A = /*#__PURE__*/babelHelpers.createClass(function A() {
  "use strict";

  babelHelpers.classCallCheck(this, A);
});
babelHelpers.defineProperty(A, "prop", 1);
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
_class2 = B;
babelHelpers.defineProperty(B, "prop", 2);
babelHelpers.defineProperty(B, "propA", babelHelpers.get(babelHelpers.getPrototypeOf(_class2), "prop", _class2));
babelHelpers.defineProperty(B, "getPropA", () => babelHelpers.get(babelHelpers.getPrototypeOf(_class2), "prop", _class2));
