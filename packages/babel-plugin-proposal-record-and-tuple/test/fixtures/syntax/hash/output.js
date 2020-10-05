"use strict";

const r1 = Record({
  a: 1,
  b: 2,
  c: 3
});
const r2 = Record({
  a: Record({
    b: Record({
      c: 123
    }),
    d: 456
  }),
  e: 789
});
const t1 = Tuple(1, 2, 3);
const t2 = Tuple(1, Tuple(2, 3, Tuple(4), 5), 6);
