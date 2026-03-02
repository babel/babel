"use strict";

function square(n){
  return new Promise(resolve => resolve(n * n));
}

square(?)(3).then(res => expect(res).toBe(9));
