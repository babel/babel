function withContext(ComposedComponent) {
  var _WithContext;
  return _WithContext = /*#__PURE__*/function (_Component) {
    "use strict";

    function WithContext() {
      babelHelpers.classCallCheck(this, WithContext);
      return babelHelpers.callSuper(this, WithContext, arguments);
    }
    babelHelpers.inherits(WithContext, _Component);
    return babelHelpers.createClass(WithContext);
  }(Component), _WithContext.propTypes = {
    context: PropTypes.shape({
      addCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func
    })
  }, _WithContext;
}
