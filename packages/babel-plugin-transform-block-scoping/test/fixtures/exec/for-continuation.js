var fns = [];

for (let i = 0; i < 10; i++) {
  fns.push(function () { return i; });
  i += 1;
}

expect(fns[0]()).toBe(1);
expect(fns[1]()).toBe(3);
expect(fns[2]()).toBe(5);
expect(fns[3]()).toBe(7);
expect(fns[4]()).toBe(9);
