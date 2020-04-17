"use strict";

const obj = {
  a: {
    b: 0,
  },
};

let test = +obj?.a?.b;

test = +obj?.a.b;

test = +obj?.b?.b;

test = +obj?.b?.b;
