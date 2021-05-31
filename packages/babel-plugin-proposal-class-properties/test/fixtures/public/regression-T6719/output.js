function withContext(ComposedComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_Component) {
    "use strict";

    babelHelpers.inherits(WithContext, _Component);

    var _super = babelHelpers.createSuper(WithContext);

    function WithContext() {
      babelHelpers.classCallCheck(this, WithContext);
      return _super.apply(this, arguments);
    }

    return WithContext;
  }(Component), babelHelpers.defineProperty(_class, "propTypes", {
    context: PropTypes.shape({
      addCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func
    })
  }), _temp;
}
