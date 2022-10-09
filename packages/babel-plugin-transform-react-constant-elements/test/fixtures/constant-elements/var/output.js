function fn(Component) {
  var _Component;
  var data = "prop";
  return () => _Component || (_Component = <Component prop={data} />);
}
