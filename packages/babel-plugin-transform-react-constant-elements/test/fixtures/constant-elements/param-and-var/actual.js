function fn(Component, obj) {

  var data = obj.data;

  return () => <Component prop={data} />;
}
