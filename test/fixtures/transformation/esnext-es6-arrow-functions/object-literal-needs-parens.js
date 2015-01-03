var keyMaker = val => ({ key: val });
assert.deepEqual(keyMaker(9), { key: 9 });
