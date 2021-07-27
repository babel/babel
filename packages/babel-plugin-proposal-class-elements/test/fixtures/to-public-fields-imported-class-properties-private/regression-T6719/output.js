function withContext(ComposedComponent) {
  var _WithContext;

  var _propTypes = babelHelpers.temporalUndefined;
  return _WithContext = class WithContext extends Component {}, _propTypes = {
    context: PropTypes.shape({
      addCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func
    })
  }, _WithContext;
}
