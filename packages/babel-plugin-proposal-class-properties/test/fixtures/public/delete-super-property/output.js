new ( /*#__PURE__*/function () {
  "use strict";

  function _class2() {
    babelHelpers.classCallCheck(this, _class2);
    babelHelpers.defineProperty(this, "y", function () {
      throw new ReferenceError("'delete super.prop' is invalid");
    }());
  }
  return babelHelpers.createClass(_class2);
}())();
new ( /*#__PURE__*/function () {
  "use strict";

  function _class4() {
    babelHelpers.classCallCheck(this, _class4);
    babelHelpers.defineProperty(this, "y", (babelHelpers.toPropertyKey(0), function () {
      throw new ReferenceError("'delete super[expr]' is invalid");
    }()));
  }
  return babelHelpers.createClass(_class4);
}())();
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
