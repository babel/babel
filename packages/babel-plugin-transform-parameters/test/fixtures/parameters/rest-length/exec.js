var length = function (a, b, ...items) {
  return items.length;
};

expect(length()).toBe(0);
expect(length(1)).toBe(0);
expect(length(1, 2)).toBe(0);
expect(length(1, 2, 3)).toBe(1);
