var names = ['Brian', 'Madeline'];
assert.deepEqual(['Thomas', ...names], ['Thomas', 'Brian', 'Madeline']);
assert.deepEqual([1, 2, ...[3, 4, 5]], [1, 2, 3, 4, 5]);
