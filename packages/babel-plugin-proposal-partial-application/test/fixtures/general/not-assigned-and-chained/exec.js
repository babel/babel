"use strict";

async function square(x) {
  return x * x;
}

square(?)(3).then(res => expect(res).toBe(9));
