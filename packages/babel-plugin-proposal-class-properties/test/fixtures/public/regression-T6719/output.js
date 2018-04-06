function withContext(ComposedComponent) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_Component) {
    babelHelpers.inherits(WithContext, _Component);

    function WithContext() {
      babelHelpers.classCallCheck(this, WithContext);
      return babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(WithContext).apply(this, arguments));
    }

    return WithContext;
  }(Component), Object.defineProperty(_class, "propTypes", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: {
      context: PropTypes.shape({
        addCss: PropTypes.func,
        setTitle: PropTypes.func,
        setMeta: PropTypes.func
      })
    }
  }), _temp;
}
