function withContext(ComposedComponent) {
  var _class, _propTypes;

  return _class = class WithContext extends Component {}, _propTypes = {
    writable: true,
    value: {
      context: PropTypes.shape({
        addCss: PropTypes.func,
        setTitle: PropTypes.func,
        setMeta: PropTypes.func
      })
    }
  }, _class;
}
