let fs = [];
for (let k = 0; k < 2; k++) {
  for (let i = k, f = () => i; i < 3; i++) {
    if (i === k) fs.push(f);
  }
}
//TODO: expect(fs.map(f => f())).toEqual([0, 1]);
expect(fs.map(f => f())).toEqual([1, 1]);
