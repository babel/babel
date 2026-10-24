// ForXStatement
{
  let a;
  for (const _ref of []) {
    const [_ref2] = _ref,
      a = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref2), _ref2)), []);
  }
  for (var _ref3 of []) {
    var _ref4;
    [_ref4] = _ref3;
    a = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref4), _ref4)), []);
  }
  async function f() {
    for await (var _ref5 of []) {
      var _ref6;
      [_ref6] = _ref5;
      a = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref6), _ref6)), []);
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
