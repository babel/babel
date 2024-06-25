var Test = /*#__PURE__*/babelHelpers.createClass(function Test() {
  "use strict";

  var _Other;
  babelHelpers.classCallCheck(this, Test);
  var Other = /*#__PURE__*/function (_Test) {
    function Other() {
      var _this;
      babelHelpers.classCallCheck(this, Other);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = babelHelpers.callSuper(this, Other, [].concat(args));
      babelHelpers.defineProperty(_this, "a", function () {
        return babelHelpers.superPropGet((_this, Other), "test", _this, 1);
      });
      return _this;
    }
    babelHelpers.inherits(Other, _Test);
    return babelHelpers.createClass(Other);
  }(Test);
  _Other = Other;
  babelHelpers.defineProperty(Other, "a", function () {
    return babelHelpers.superPropGet(_Other, "test", _Other);
  });
});
