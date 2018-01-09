function render(_ref) {
  let text = _ref.text,
      className = _ref.className,
      id = _ref.id;

  var _ref2 = <Component text={text} className={className} id={id} />;

  return () => _ref2;
}
