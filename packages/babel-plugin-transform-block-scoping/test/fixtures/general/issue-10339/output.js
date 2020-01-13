function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
      bar = _objectWithoutPropertiesLoose(_ref, ["foo"]);

  _loop(foo, bar);
}
