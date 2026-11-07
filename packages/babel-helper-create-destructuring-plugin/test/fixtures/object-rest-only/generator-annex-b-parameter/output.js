function f(a, _ref) {
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
  return function* () {
    {
      let a;
      {
        function a() {}
      }
    }
    yield typeof a;
  }();
}
