function render(_ref) {
  let text = _ref.text,
      className = _ref.className,
      id = _ref.id,
      props = babelHelpers.objectWithoutProperties(_ref, ["text", "className", "id"]);
  return () => <Component text={text} className={className} id={id} {...props} />;
}
