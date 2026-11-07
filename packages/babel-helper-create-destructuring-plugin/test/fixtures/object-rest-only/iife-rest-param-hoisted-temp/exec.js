// Temporaries are hoisted as `var`s, not as new parameters of the IIFE,
// when its last parameter is a rest element
var f = () => "k",
  z = { k: 1, w: 2 },
  x,
  y;
var rest = (function ({ a, ...b }, ...rest) {
  ({ [f()]: x, ...y } = z);
  return rest;
})({ a: 0 }, 3);
expect([x, y, rest]).toEqual([1, { w: 2 }, [3]]);
