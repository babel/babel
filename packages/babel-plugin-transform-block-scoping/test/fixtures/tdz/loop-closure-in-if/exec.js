var f = [];
if (true) for (let i = 0; i < 2; i++) f.push(() => i);
expect(f.map(g => g())).toEqual([0, 1]);
