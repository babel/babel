function withContext(ComposedComponent) {
  var _class, _temp, _propTypes;

  return _temp = _class = class WithContext extends Component {}, _propTypes = {
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
