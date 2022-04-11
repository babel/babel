function fn(Component) {

  var data = "prop";

  return () => <Component prop={data} />;
}
