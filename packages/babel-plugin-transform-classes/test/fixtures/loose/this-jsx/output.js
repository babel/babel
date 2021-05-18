let Test = /*#__PURE__*/function (_React$Component) {
  "use strict";

  babelHelpers.inheritsLoose(Test, _React$Component);

  function Test() {
    var _this;

    const fn = () => <_this.A />;

    fn();
    _this = _React$Component.call(this) || this;
    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "renderA", () => <_this.A prop={_this.b} />);
    babelHelpers.defineProperty(babelHelpers.assertThisInitialized(_this), "renderB", () => {
      const {
        A
      } = babelHelpers.assertThisInitialized(_this);
      return <A />;
    });
    return _this;
  }

  var _proto = Test.prototype;

  _proto.renderC = function renderC() {
    return <this.A />;
  };

  return Test;
}(React.Component);
