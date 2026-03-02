const [void, { p: void, ...rest1 }, ...rest2] = [0, { p: 1, q: 2, r: 3 }];

expect(rest1).toEqual({ q: 2, r: 3 });
expect(rest2).toEqual([]);
