const _excluded = ["a"],
  _excluded2 = ["a"],
  _excluded3 = ["a"],
  _excluded4 = ["a"];
// ForXStatement
{
  let a, b;
  for (const _ref of []) {
    const [_ref2] = _ref,
      {
        a
      } = _ref2,
      b = babelHelpers.objectWithoutProperties(_ref2, _excluded);
  }
  for (var _ref3 of []) {
    var _ref4;
    [_ref4] = _ref3, {
      a
    } = _ref4, b = babelHelpers.objectWithoutProperties(_ref4, _excluded2);
  }
  async function f() {
    for await (var _ref5 of []) {
      var _ref6;
      [_ref6] = _ref5, {
        a
      } = _ref6, b = babelHelpers.objectWithoutProperties(_ref6, _excluded3);
    }
  }
  for (const _ref7 of []) {
    const [_ref8] = _ref7.a,
      {
        a
      } = _ref8,
      b = babelHelpers.objectWithoutProperties(_ref8, _excluded4);
  }
}

// skip
{
  for ([{
    a
  }] in {}) {}
  for ([{
    a
  }] of []) {}
  async function a() {
    for await ([{
      a
    }] of []) {}
  }
}
{
  for ([a, ...b] in {}) {}
  for ([a, ...b] of []) {}
  async function a() {
    for await ([a, ...b] of []) {}
  }
}
