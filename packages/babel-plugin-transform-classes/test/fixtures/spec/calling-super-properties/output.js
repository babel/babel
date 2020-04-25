var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inherits(Test, _Foo);

  var _super = babelHelpers.createSuper(Test);

  function Test() {
    var _thisSuper, _thisSuper2, _this;

    babelHelpers.classCallCheck(this, Test);
    _this = _super.call(this);
    babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper).whatever();
    babelHelpers.get((_thisSuper2 = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper2).call(_thisSuper2);
    return _this;
  }

  babelHelpers.createClass(Test, null, [{
    key: "test",
    value: function test() {
      var _thisSuper3;

      return babelHelpers.get((_thisSuper3 = this, babelHelpers.getPrototypeOf(Test)), "wow", _thisSuper3).call(_thisSuper3);
    }
  }]);
  return Test;
}(Foo);
