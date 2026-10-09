function rest(void, { p: void, ...q }) { return q }

expect(rest.length).toBe(2);
expect(rest.apply(null, [0, { p: 1, q: 2, r: 3 }])).toEqual({ q: 2, r: 3 });
