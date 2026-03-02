new (/*#__PURE__*/babelHelpers.createClass(function _class() {
  "use strict";

  babelHelpers.classCallCheck(this, _class);
  babelHelpers.defineProperty(this, "y", function () {
    throw new ReferenceError("'delete super.prop' is invalid");
  }());
}))();
new (/*#__PURE__*/babelHelpers.createClass(function _class2() {
  "use strict";

  babelHelpers.classCallCheck(this, _class2);
  babelHelpers.defineProperty(this, "y", (babelHelpers.toPropertyKey(0), function () {
    throw new ReferenceError("'delete super[expr]' is invalid");
  }()));
}))();
var X1 = /*#__PURE__*/babelHelpers.createClass(function X1() {
  "use strict";

  babelHelpers.classCallCheck(this, X1);
});
babelHelpers.defineProperty(X1, "y", function () {
  throw new ReferenceError("'delete super.prop' is invalid");
}());
var X2 = /*#__PURE__*/babelHelpers.createClass(function X2() {
  "use strict";

  babelHelpers.classCallCheck(this, X2);
});
babelHelpers.defineProperty(X2, "y", (babelHelpers.toPropertyKey(0), function () {
  throw new ReferenceError("'delete super[expr]' is invalid");
}()));
