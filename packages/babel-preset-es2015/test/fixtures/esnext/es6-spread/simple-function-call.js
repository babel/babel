function sum(...numbers) {
  return numbers.reduce(function(sum, n) { return n + sum; }, 0);
}

var numbers = [1, 2, 3];
assert.equal(sum(...numbers), 6);
