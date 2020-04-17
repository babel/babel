"use strict";

const obj = {
  a: {
    b: 0,
  },
};

let test = delete obj?.a?.b;

test = delete obj?.a.b;

test = delete obj?.b?.b;

delete obj?.a;
