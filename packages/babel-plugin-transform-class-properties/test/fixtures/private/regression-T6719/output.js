function withContext(ComposedComponent) {
  var _WithContext, _propTypes;
  return _WithContext = class WithContext extends Component {}, _propTypes = {
    _: {
      context: PropTypes.shape({
        addCss: PropTypes.func,
        setTitle: PropTypes.func,
        setMeta: PropTypes.func
      })
    }
  }, _WithContext;
}
