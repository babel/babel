// The exec test isn't run as a module: `export` is removed.
const obj = { a: ["b"], c: 1 };
const used = [];
const use = (...args) => used.push(args);
const { a, ...rest } = obj;
const [b] = a;
use(a, b, rest);
expect(used).toEqual([[["b"], "b", { c: 1 }]]);
