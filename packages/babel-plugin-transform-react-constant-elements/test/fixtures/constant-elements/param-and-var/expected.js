function fn(Component, obj) {

  var data = obj.data;

  var _ref = <Component prop={data} />;

  return () => _ref;
}