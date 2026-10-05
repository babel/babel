let log = [];
for (let i = 0, f = () => { [i] = [1]; }, g = () => i; i < 1; ) {
  f();
  log.push(i, g());
  i = 42;
}
expect(log).toEqual([0, 1]);
