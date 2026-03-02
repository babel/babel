function withContext(ComposedComponent) {
  var _class, _temp;

  return _temp = _class = class WithContext extends Component {}, _class.propTypes = {
    context: PropTypes.shape({
      addCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func
    })
  }, _temp;
}
