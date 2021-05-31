var arr = [1, 2, 3];
var results = [];

for (let v of arr) {
  results.push(v);
  arr = null;
}

expect(results).toEqual([1, 2, 3]);
