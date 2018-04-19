var names = ['Brian', 'Madeline'];
expect(['Thomas', ...names]).toEqual(['Thomas', 'Brian', 'Madeline']);
expect([1, 2, ...[3, 4, 5]]).toEqual([1, 2, 3, 4, 5]);
