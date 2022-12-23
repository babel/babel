let res = [];

for (let i = 1; i < 3; i++) {
  let x = i;
  res.push((() => x)());
}

for (let i = 4; i < 6; i++) {
  let y = i;
  res.push((() => y)());
}

expect(res).toEqual([1, 2, 4, 5]);
