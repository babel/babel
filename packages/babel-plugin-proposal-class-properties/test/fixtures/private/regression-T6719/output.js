function withContext(ComposedComponent) {
  var WithContext, _temp, _propTypes;

  return _temp = WithContext = class WithContext extends Component {}, _propTypes = {
    writable: true,
    value: {
      context: PropTypes.shape({
        addCss: PropTypes.func,
        setTitle: PropTypes.func,
        setMeta: PropTypes.func
      })
    }
  }, _temp;
}
