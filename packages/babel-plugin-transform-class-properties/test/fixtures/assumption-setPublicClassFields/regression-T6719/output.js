function withContext(ComposedComponent) {
  var _WithContext;
  return _WithContext = class WithContext extends Component {}, _WithContext.propTypes = {
    context: PropTypes.shape({
      addCss: PropTypes.func,
      setTitle: PropTypes.func,
      setMeta: PropTypes.func
    })
  }, _WithContext;
}
