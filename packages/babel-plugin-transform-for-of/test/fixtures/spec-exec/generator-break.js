function* f() {
  yield 1; yield 2; yield 3;
}

let res = [];

for (const x of f()) {
  if (x === 2) break;
  res.push(x);
}

expect(res).toEqual([1]);
