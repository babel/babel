const [{ a, ...r }, b = a] = [{ a: 1, c: 2 }];
expect(a).toBe(1);
expect(r).toEqual({ c: 2 });
expect(b).toBe(1);
