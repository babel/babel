function arrayOf() {
  return [...arguments];
}

expect(Object.prototype.toString.call(arrayOf())).toBe('[object Array]');
expect(arrayOf(1, 2, 3)).toEqual([1, 2, 3]);
