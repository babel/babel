function render(_ref) {
  var _Component;
  let text = _ref.text;
  return () => _Component || (_Component = <Component text={text} />);
}
