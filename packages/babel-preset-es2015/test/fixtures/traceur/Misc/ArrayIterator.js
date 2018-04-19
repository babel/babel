var a = ['a', 'b', 'c'];

var res = [];
for (var x of a) {
  res.push(x);
}
expect(res).toEqual(['a', 'b', 'c']);

expect(a[Symbol.iterator]).toBe(a.values);

res = [];
for (var x of a.values()) {
  res.push(x);
}
expect(res).toEqual(['a', 'b', 'c']);

res = [];
for (var x of a.keys()) {
  res.push(x);
}
expect(res).toEqual([0, 1, 2]);

res = [];
for (var x of a.entries()) {
  res.push(x);
}
expect(res).toEqual([[0, 'a'], [1, 'b'], [2, 'c']]);
