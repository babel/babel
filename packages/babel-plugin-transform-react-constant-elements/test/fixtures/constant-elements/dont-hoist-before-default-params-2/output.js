function render() {
  var _Component;
  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return () => _Component || (_Component = <Component title={title} />);
}
