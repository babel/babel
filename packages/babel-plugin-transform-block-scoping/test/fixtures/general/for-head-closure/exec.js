let log = [];
for (let i = 0, f = () => i; i < 1; ) {
  i = 42;
  log.push(f());
}
expect(log).toEqual([0]);
