function withContext(ComposedComponent) {
  var _WithContext;
  return _WithContext = /*#__PURE__*/function (_Component) {
    "use strict";

    babelHelpers.inherits(WithContext, _Component);
    function WithContext() {
      babelHelpers.classCallCheck(this, WithContext);
      return babelHelpers.callSuper(this, WithContext, arguments);
    }
    return babelHelpers.createClass(WithContext);
  }(Component), babelHelpers.defineProperty(_WithContext, "propTypes", {
    context: PropTypes.shape({
      addCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func
    })
  }), _WithContext;
}
