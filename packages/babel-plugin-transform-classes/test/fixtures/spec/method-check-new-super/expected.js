var Test =
/*#__PURE__*/
function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    babelHelpers.classCallCheck(this, Test);
    return babelHelpers.possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).call(this));
  }

  babelHelpers.createClass(Test, [{
    key: "test",
    value: function test() {
      babelHelpers.newClassMethodCheck(this, Test.prototype.test);
      new (babelHelpers.get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "test", this))();
    }
  }]);
  return Test;
}(Foo);
