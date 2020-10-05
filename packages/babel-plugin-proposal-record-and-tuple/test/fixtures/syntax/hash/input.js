"use strict";

const r1 = #{
  a: 1,
  b: 2,
  c: 3,
};

const r2 = #{
  a: #{
    b: #{
      c: 123,
    },
    d: 456,
  },
  e: 789,
};

const t1 = #[1,2,3];

const t2 = #[1, #[2, 3, #[4], 5], 6];
