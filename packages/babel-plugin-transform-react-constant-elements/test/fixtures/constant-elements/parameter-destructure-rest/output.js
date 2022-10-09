const _excluded = ["text", "className", "id"];
function render(_ref) {
  var _Component;
  let text = _ref.text,
    className = _ref.className,
    id = _ref.id,
    props = babelHelpers.objectWithoutProperties(_ref, _excluded);
  // intentionally ignoring props
  return () => _Component || (_Component = <Component text={text} className={className} id={id} />);
}
