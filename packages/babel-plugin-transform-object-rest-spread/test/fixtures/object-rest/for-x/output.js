const _excluded = ["a"],
  _excluded2 = ["a"],
  _excluded3 = ["a"];
// ForXStatement
for (var _ref of []) {
  var {
      a
    } = _ref,
    b = babelHelpers.objectWithoutProperties(_ref, _excluded);
}
for (var _ref2 of []) {
  var _ref3 = _ref2;
  ({
    a
  } = _ref3);
  b = babelHelpers.objectWithoutProperties(_ref3, _excluded2);
  _ref3;
}
async function a() {
  for await (var _ref4 of []) {
    var _ref5 = _ref4;
    ({
      a
    } = _ref5);
    b = babelHelpers.objectWithoutProperties(_ref5, _excluded3);
    _ref5;
  }
}

// skip
for ({
  a
} in {}) {}
for ({
  a
} of []) {}
async function a() {
  for await ({
    a
  } of []) {}
}
for (a in {}) {}
for (a of []) {}
async function a() {
  for await (a of []) {}
}
