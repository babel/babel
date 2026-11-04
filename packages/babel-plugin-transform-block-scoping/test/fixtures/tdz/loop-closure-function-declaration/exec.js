var f = [];
for (let i = 0; i < 2; i++) {
  function k() {
    return i;
  }
  f.push(k);
}
expect(f.map(g => g())).toEqual([0, 1]);
