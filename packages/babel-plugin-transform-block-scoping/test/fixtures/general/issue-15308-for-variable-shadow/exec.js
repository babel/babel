let res = [];

let i = 0;
for (let i = 4; i < 6; i++) {
  let y = i;
  res.push((() => y)());
}

expect(res).toEqual([4, 5]);
