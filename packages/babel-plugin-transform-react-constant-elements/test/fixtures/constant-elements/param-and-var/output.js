function fn(Component, obj) {
  var _Component;
  var data = obj.data;
  return () => _Component || (_Component = <Component prop={data} />);
}
