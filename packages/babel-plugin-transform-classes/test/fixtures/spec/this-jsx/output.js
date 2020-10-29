let Test = /*#__PURE__*/function (_React$Component) {
  "use strict";

  babelHelpers.inherits(Test, _React$Component);

  var _super = babelHelpers.createSuper(Test);

  function Test() {
    var _this;

    babelHelpers.classCallCheck(this, Test);

    const fn = () => <_this.A />;

    fn();
    _this = _super.call(this);
    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "renderA", () => <_this.A prop={_this.b} />);
    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "renderB", () => {
      const {
        A
      } = babelHelpers.assertThisInitialized(_this);
      return <A />;
    });
    return _this;
  }

  babelHelpers.createClass(Test, [{
    key: "renderC",
    value: function renderC() {
      return <this.A />;
    }
  }]);
  return Test;
}(React.Component);
