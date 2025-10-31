// Computed keys must be evaluated in source order (left-to-right)
// even when nested object rest is involved. This test verifies
// that log(0), log(1), log(2), log(3) execute in that order.

function log(n) {
  console.log(n);
  return "x";
}
const _x = {
    x: {
      x: {}
    }
  },
  _log = log(0),
  _log2 = log(1),
  _log3 = log(2),
  _log4 = log(3),
  {
    [_log]: {
      [_log2]: x,
      [_log3]: y
    },
    [_log4]: z
  } = _x,
  rest = babelHelpers.objectWithoutProperties(_x[_log], [_log2, _log3].map(babelHelpers.toPropertyKey));
