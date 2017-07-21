try {} catch (_a) {
  var a34 = babelHelpers.objectWithoutProperties(_a, []);
}

try {} catch (_a1$b) {
  var {
    a1
  } = _a1$b,
      b1 = babelHelpers.objectWithoutProperties(_a1$b, ["a1"]);
}

try {} catch (_a2$b2$c) {
  var {
    a2,
    b2
  } = _a2$b2$c,
      c2 = babelHelpers.objectWithoutProperties(_a2$b2$c, ["a2", "b2"]);
}

try {} catch ({
  a2,
  b2,
  c2: _c3$c
}) {
  var {
    c3
  } = _c3$c,
      c4 = babelHelpers.objectWithoutProperties(_c3$c, ["c3"]);
} // Unchanged


try {} catch (a) {}

try {} catch ({
  b
}) {}