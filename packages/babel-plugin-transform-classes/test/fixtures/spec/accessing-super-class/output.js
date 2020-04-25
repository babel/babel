var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inherits(Test, _Foo);

  var _super = babelHelpers.createSuper(Test);

  function Test() {
    var _babelHelpers$get;

    var _thisSuper, _thisSuper2, _thisSuper3, _this;

    babelHelpers.classCallCheck(this, Test);
    woops.super.test();
    _this = _super.call(this);
    babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper).call(babelHelpers.assertThisInitialized(_this));
    _this = _super.apply(this, arguments);
    _this = _super.call.apply(_super, [this, "test"].concat(Array.prototype.slice.call(arguments)));
    babelHelpers.get((_thisSuper2 = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper2).apply(babelHelpers.assertThisInitialized(_this), arguments);

    (_babelHelpers$get = babelHelpers.get((_thisSuper3 = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper3)).call.apply(_babelHelpers$get, [babelHelpers.assertThisInitialized(_this), "test"].concat(Array.prototype.slice.call(arguments)));

    return _this;
  }

  babelHelpers.createClass(Test, [{
    key: "test",
    value: function test() {
      var _babelHelpers$get2;

      var _thisSuper4, _thisSuper5, _thisSuper6;

      babelHelpers.get((_thisSuper4 = this, babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper4).call(this);
      babelHelpers.get((_thisSuper5 = this, babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper5).apply(this, arguments);

      (_babelHelpers$get2 = babelHelpers.get((_thisSuper6 = this, babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper6)).call.apply(_babelHelpers$get2, [this, "test"].concat(Array.prototype.slice.call(arguments)));
    }
  }], [{
    key: "foo",
    value: function foo() {
      var _babelHelpers$get3;

      var _thisSuper7, _thisSuper8, _thisSuper9;

      babelHelpers.get((_thisSuper7 = this, babelHelpers.getPrototypeOf(Test)), "foo", _thisSuper7).call(this);
      babelHelpers.get((_thisSuper8 = this, babelHelpers.getPrototypeOf(Test)), "foo", _thisSuper8).apply(this, arguments);

      (_babelHelpers$get3 = babelHelpers.get((_thisSuper9 = this, babelHelpers.getPrototypeOf(Test)), "foo", _thisSuper9)).call.apply(_babelHelpers$get3, [this, "test"].concat(Array.prototype.slice.call(arguments)));
    }
  }]);
  return Test;
}(Foo);
