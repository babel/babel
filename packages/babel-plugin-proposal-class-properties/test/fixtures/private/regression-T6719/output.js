function withContext(ComposedComponent) {
  var _class, _temp;

  return function () {
    _temp = _class = class WithContext extends Component {};

    var _classStatics = Object.create(null);

    babelHelpers.defineProperty(_classStatics, "propTypes", {
      context: PropTypes.shape({
        addCss: PropTypes.func,
        setTitle: PropTypes.func,
        setMeta: PropTypes.func
      })
    });
    return _temp;
  }();
}
