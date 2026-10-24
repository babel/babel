var _log, _log2;
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
  _x$log = _x[log(0)],
  {
    [_log = log(1)]: x,
    [_log2 = log(2)]: y
  } = _x$log,
  rest = babelHelpers.objectWithoutProperties(_x$log, [_log, _log2].map(babelHelpers.toPropertyKey)),
  {
    [log(3)]: z
  } = _x;
