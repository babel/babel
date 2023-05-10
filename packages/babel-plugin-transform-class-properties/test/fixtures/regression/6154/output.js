var Test = /*#__PURE__*/babelHelpers.createClass(function Test() {
  "use strict";

  babelHelpers.classCallCheck(this, Test);
  var Other = /*#__PURE__*/function (_Test) {
    babelHelpers.inherits(Other, _Test);
    var _super = babelHelpers.createSuper(Other);
    function Other() {
      var _thisSuper, _this;
      babelHelpers.classCallCheck(this, Other);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _super.call.apply(_super, [this].concat(args));
      babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "a", function () {
        return babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Other.prototype)), "test", _thisSuper);
      });
      return _this;
    }
    return babelHelpers.createClass(Other);
  }(Test);
  babelHelpers.defineProperty(Other, "a", function () {
    return babelHelpers.get(babelHelpers.getPrototypeOf(Other), "test", Other);
  });
});
