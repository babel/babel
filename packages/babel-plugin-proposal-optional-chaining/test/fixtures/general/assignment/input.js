"use strict";

const obj = {
  a: {
    b: {
      c: {
        d: 2,
      },
    },
  },
};

const a = obj?.a;

const b = obj?.a?.b;

const bad = obj?.b?.b;

let val;
val = obj?.a?.b;
