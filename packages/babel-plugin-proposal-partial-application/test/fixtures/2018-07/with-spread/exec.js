"use strict";

const num = [2,3];

function multiplyXYZ(x, y, z){
  return x * y * z;
}

const multiplyBySix = multiplyXYZ(?, ...num);

expect(multiplyBySix(6)).toBe(36);
expect(multiplyBySix.length).toEqual(1);
expect(multiplyBySix.name).toEqual("multiplyXYZ");
