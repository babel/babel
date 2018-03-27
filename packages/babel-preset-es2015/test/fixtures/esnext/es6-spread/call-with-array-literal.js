function sum(...numbers) {
  return numbers.reduce(function(sum, n) { return n + sum; }, 0);
}

expect(sum(4, 5, ...[10, 20, 30])).toBe(69);
