function* f() {
  yield 1; yield 2; yield 3;
}

let res = [];

for (const x of f()) res.push(x);

expect(res).toEqual([1, 2, 3]);
