"use strict";

async function square(x) {
  return await x * x;
}

square(?)(3).then(res => expect(res).toBe(9));
