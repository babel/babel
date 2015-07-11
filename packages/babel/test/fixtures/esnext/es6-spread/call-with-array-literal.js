function sum(...numbers) {
  return numbers.reduce(function(sum, n) { return n + sum; }, 0);
}

assert.equal(sum(4, 5, ...[10, 20, 30]), 69);
