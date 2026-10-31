let n = 1;
const key = { valueOf() { n = 2; return 0; } };
const [a = +key, b] = [undefined, n];
expect([a, b, n]).toEqual([0, 1, 2]);
