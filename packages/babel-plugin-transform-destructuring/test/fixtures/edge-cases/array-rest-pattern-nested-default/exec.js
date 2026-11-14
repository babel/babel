var it = { *[Symbol.iterator]() { yield 0; } };
var [, ...{ w: a = 1 }] = it;
var [b, ...[c = 2]] = it;
expect([a, b, c]).toEqual([1, 0, 2]);
