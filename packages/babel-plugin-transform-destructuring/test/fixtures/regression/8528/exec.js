function isBetween(x, a, b) {
  if (a > b) [a, b] = [b, a];
  return x > a && x < b;
}

expect(isBetween(5, 1, 10)).toBe(true);
expect(isBetween(5, 10, 1)).toBe(true);
expect(isBetween(0, 1, 10)).toBe(false);
expect(isBetween(0, 10, 1)).toBe(false);
