function withContext(ComposedComponent) {
  var _class;
  return _class = class WithContext extends Component {}, _class.propTypes = {
    context: PropTypes.shape({
      addCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func
    })
  }, _class;
}
