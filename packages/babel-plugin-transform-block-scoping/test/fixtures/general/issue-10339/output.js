var _excluded = ["foo"];
var _loop = function (foo) {
  () => foo;
  var [qux] = bar;
  try {} catch (e) {
    var quux = qux;
  }
};
for (var _ref of {}) {
  var _ref2 = _ref,
    {
      foo
    } = _ref2,
    bar = babelHelpers.objectWithoutPropertiesLoose(_ref2, _excluded);
  _loop(foo);
}
