let log = [];
for (let i = 0; i < 2; ) {
  [i] = [i + 1];
  log.push(() => i);
}
expect(log.map(f => f())).toEqual([1, 2]);
