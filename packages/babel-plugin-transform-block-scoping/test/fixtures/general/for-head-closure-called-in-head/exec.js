let log = [];
for (let i = 0, x = () => i, y = log.push(x()); i < 1; i++) {
  i = 42;
}
expect(log).toEqual([0]);
