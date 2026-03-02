let res = [];

for (let i = 1; i < 6; i++) {
  let y = i;
  res.push((() => y)());
  i++;
}

expect(res).toEqual([1, 3, 5]);
