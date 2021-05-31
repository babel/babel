let arr = (() => [1, 2, 3])(); // Disable inference
let res = [];

for (const x of arr) res.push(x);

expect(res).toEqual([1, 2, 3]);
