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
    [_ref4] = _ref3;
    var _ref5 = _ref4;
    ({
      a
    } = _ref5);
    b = babelHelpers.objectWithoutProperties(_ref5, _excluded2);
    _ref5;
  }
  async function f() {
    for await (var _ref6 of []) {
      [_ref7] = _ref6;
      var _ref8 = _ref7;
      ({
        a
      } = _ref8);
      b = babelHelpers.objectWithoutProperties(_ref8, _excluded3);
      _ref8;
    }
  }
  for (const _ref9 of []) {
    const {
        a: [{
          a
        }]
      } = _ref9,
      b = babelHelpers.objectWithoutProperties(_ref9.a, _excluded4);
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
