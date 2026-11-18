let arr = (() => [1, 2, 3])(); // Disable inference
let res = [];

for (const x of arr) {
  if (x === 2) break;
  res.push(x);
}

expect(res).toEqual([1]);
