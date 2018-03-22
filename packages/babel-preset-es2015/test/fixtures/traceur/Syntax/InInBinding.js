var [x = 'a' in {a: 1}] = [];
expect(x).toBe(true);
