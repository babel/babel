function render(Component) {
  var _Component;
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return function () {
    return _Component || (_Component = <Component text={text} />);
  };
}
