var zs = [1];

function isSorted([x, y, ...wow]) {
  if (!zs.length) return true
  if (y > x) return isSorted(zs)
  return false
}

expect(isSorted.length).toBe(1);
expect(isSorted([2, 1])).toBe(false);
expect(isSorted([1, 2])).toBe(false);
zs = [];
expect(isSorted([1, 2, 3])).toBe(true);
expect(() => isSorted(null)).toThrow(TypeError);
