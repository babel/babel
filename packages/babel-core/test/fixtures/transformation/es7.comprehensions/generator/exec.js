var nums = [1, 2, 3, 4, 5, 6];
var multiples = (for (i of nums) if (i % 2) i * i);
assert.equal(multiples.next().value, 1);
assert.equal(multiples.next().value, 9);
assert.equal(multiples.next().value, 25);
assert.ok(multiples.next().done);
