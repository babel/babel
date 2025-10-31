// Computed keys must be evaluated in source order (left-to-right)
// even when nested object rest is involved. This test verifies
// that log(0), log(1), log(2), log(3) execute in that order.

function log(n) {
  console.log(n);
  return "x";
}

const { [log(0)]: { [log(1)]: x, [log(2)]: y, ...rest }, [log(3)]: z } = { x: { x: {} } };

