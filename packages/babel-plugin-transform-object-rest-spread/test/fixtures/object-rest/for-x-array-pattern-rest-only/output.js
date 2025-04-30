// ForXStatement
{
  let a;
  for (const _ref of []) {
    const [_ref2] = _ref,
      a = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_ref2), _ref2));
  }
  for (var _ref3 of []) {
    [_ref4] = _ref3;
    var _ref5 = _ref4;
    ({} = _ref5);
    a = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_ref5), _ref5));
    _ref5;
  }
  async function f() {
    for await (var _ref6 of []) {
      [_ref7] = _ref6;
      var _ref8 = _ref7;
      ({} = _ref8);
      a = babelHelpers.extends({}, (babelHelpers.objectDestructuringEmpty(_ref8), _ref8));
      _ref8;
    }
  }
}

// skip
{
  for ([...a] in {}) {}
  for ([...a] of []) {}
  async function a() {
    for await ([...a] of []) {}
  }
}
