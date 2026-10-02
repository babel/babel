let log = [];
for (let i = 0, f = () => i, set = (i = 1), read = log.push(f()); i < 1; ) {}
expect(log).toEqual([1]);

let g;
for (let i = 0, a = (g = () => i), b = i++; false; );
expect(g()).toBe(1);
