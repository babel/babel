function makeMultiplier(x=1) {
  return (y=1) => x * y;
}

expect(makeMultiplier()()).toBe(1);
expect(makeMultiplier(2)(3)).toBe(6);
expect([1, 2, 3].map(makeMultiplier(2))).toEqual([2, 4, 6]);
expect([undefined, null, 0].map(makeMultiplier(2))).toEqual([2, 0, 0]);
