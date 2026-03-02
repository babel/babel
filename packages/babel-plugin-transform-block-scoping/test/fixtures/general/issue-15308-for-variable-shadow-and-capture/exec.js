let res = [];

let i = 0;
for (let i = 4; i < 6; i++) {
  res.push((() => i)());
}

expect(res).toEqual([4, 5]);
