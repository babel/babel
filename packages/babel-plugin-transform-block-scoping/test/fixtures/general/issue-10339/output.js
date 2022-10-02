var _excluded = ["foo"];
var _loop = function (foo, bar) {
  () => foo;
  var [qux] = bar;
  try {} catch (e) {
    var quux = qux;
  }
};
for (var _ref of {}) {
  var {
      foo
    } = _ref,
    bar = babelHelpers.objectWithoutPropertiesLoose(_ref, _excluded);
  _loop(foo, bar);
}
