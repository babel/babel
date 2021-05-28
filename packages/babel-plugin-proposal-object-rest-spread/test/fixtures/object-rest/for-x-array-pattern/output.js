const _exclude = ["a"],
      _exclude2 = ["a"],
      _exclude3 = ["a"];

// ForXStatement
for (const _ref of []) {
  const [_ref2] = _ref;
  const {
    a
  } = _ref2,
        b = babelHelpers.objectWithoutProperties(_ref2, _exclude);
}

for (var _ref3 of []) {
  [_ref4] = _ref3;
  var {
    a
  } = _ref4,
      b = babelHelpers.objectWithoutProperties(_ref4, _exclude2);
}

async function a() {
  for await (var _ref5 of []) {
    [_ref6] = _ref5;
    var {
      a
    } = _ref6,
        b = babelHelpers.objectWithoutProperties(_ref6, _exclude3);
  }
} // skip


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

for ([a, ...b] in {}) {}

for ([a, ...b] of []) {}

async function a() {
  for await ([a, ...b] of []) {}
}
