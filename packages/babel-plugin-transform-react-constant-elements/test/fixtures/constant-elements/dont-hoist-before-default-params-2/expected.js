function render() {
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var _ref = <Component title={title} />;

  return () => _ref;
}
