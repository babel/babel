function render(_ref) {
  let text = _ref.text,
      className = _ref.className,
      id = _ref.id,
      props = babelHelpers.objectWithoutProperties(_ref, ["text", "className", "id"]);

  var _ref2 = <Component text={text} className={className} id={id} />;

  // intentionally ignoring props
  return () => _ref2;
}
