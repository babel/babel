var f = [];
function run() {
  for (let i = 0; i < 5; i++) {
    f.push(() => i);
    if (i === 2) return i * 10;
  }
}
expect(run()).toBe(20);
expect(f.map(g => g())).toEqual([0, 1, 2]);
