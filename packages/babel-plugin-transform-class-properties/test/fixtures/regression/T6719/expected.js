function withContext(ComposedComponent) {
  var _class, _temp;

  return _temp = _class = function (_Component) {
    babelHelpers.inherits(WithContext, _Component);

    function WithContext() {
      babelHelpers.classCallCheck(this, WithContext);
      return babelHelpers.possibleConstructorReturn(this, (WithContext.__proto__ || Object.getPrototypeOf(WithContext)).apply(this, arguments));
    }

    return WithContext;
  }(Component), _class.propTypes = {
    context: PropTypes.shape({
      addCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func
    })
  }, _temp;
}
