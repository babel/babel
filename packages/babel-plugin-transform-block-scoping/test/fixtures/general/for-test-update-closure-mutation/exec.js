var fs = [];
for (let i = 1; fs.push(() => i), i < 2; i++, fs.push(() => i));
expect(fs.map(f => f())).toEqual([1, 2, 2]);
