function render(_ref) {
  var _Component;
  let text = _ref.text,
    className = _ref.className,
    id = _ref.id;
  return () => _Component || (_Component = <Component text={text} className={className} id={id} />);
}
