var Test = /*#__PURE__*/function (_Foo) {
  "use strict";

  babelHelpers.inherits(Test, _Foo);

  var _super = babelHelpers.createSuper(Test);

  function Test() {
    var _sprd, _sprd2, _babelHelpers$get;

    var _thisSuper, _thisSuper2, _thisSuper3, _this;

    babelHelpers.classCallCheck(this, Test);
    woops.super.test();
    _this = _super.call(this);
    babelHelpers.get((_thisSuper = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper).call(_thisSuper);
    _this = _super.apply(this, arguments);
    _this = _super.call.apply(_super, ((_sprd = [this, "test"]).push.apply(_sprd, arguments), _sprd));
    babelHelpers.get((_thisSuper2 = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper2).apply(_thisSuper2, arguments);

    (_babelHelpers$get = babelHelpers.get((_thisSuper3 = babelHelpers.assertThisInitialized(_this), babelHelpers.getPrototypeOf(Test.prototype)), "test", _thisSuper3)).call.apply(_babelHelpers$get, ((_sprd2 = [_thisSuper3, "test"]).push.apply(_sprd2, arguments), _sprd2));

    return _this;
  }

  babelHelpers.createClass(Test, [{
    key: "test",
    value: function test() {
      var _sprd3, _babelHelpers$get2;

      babelHelpers.get(babelHelpers.getPrototypeOf(Test.prototype), "test", this).call(this);
      babelHelpers.get(babelHelpers.getPrototypeOf(Test.prototype), "test", this).apply(this, arguments);

      (_babelHelpers$get2 = babelHelpers.get(babelHelpers.getPrototypeOf(Test.prototype), "test", this)).call.apply(_babelHelpers$get2, ((_sprd3 = [this, "test"]).push.apply(_sprd3, arguments), _sprd3));
    }
  }], [{
    key: "foo",
    value: function foo() {
      var _sprd4, _babelHelpers$get3;

      babelHelpers.get(babelHelpers.getPrototypeOf(Test), "foo", this).call(this);
      babelHelpers.get(babelHelpers.getPrototypeOf(Test), "foo", this).apply(this, arguments);

      (_babelHelpers$get3 = babelHelpers.get(babelHelpers.getPrototypeOf(Test), "foo", this)).call.apply(_babelHelpers$get3, ((_sprd4 = [this, "test"]).push.apply(_sprd4, arguments), _sprd4));
    }
  }]);
  return Test;
}(Foo);
