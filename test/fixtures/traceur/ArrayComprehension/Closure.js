// Options: --array-comprehension --block-binding
// Block binding is needed to get the right scoping semantics inside the arrow
// function in the comprehension.

var res = [for (x of [0, 1]) for (y of [2, 3]) () => [x, y]];

assert.equal(4, res.length);
assertArrayEquals([0, 2], res[0]());
assertArrayEquals([0, 3], res[1]());
assertArrayEquals([1, 2], res[2]());
assertArrayEquals([1, 3], res[3]());
