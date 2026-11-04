var f = [];
for (let i = 0; i < 2; f.push(() => i), i++);
expect(f.map(g => g())).toEqual([1, 2]);
