return (async () => {
  var f = [], r = [];
  for (let i = 0; f.push(() => i), (await Promise.resolve(i)) < 3; i++) {
    r.push(i);
  }
  expect(r).toEqual([0, 1, 2]);
  expect(f.map(g => g())).toEqual([0, 1, 2, 3]);
})();
