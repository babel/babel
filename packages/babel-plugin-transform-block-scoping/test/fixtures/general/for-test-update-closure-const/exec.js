var f = [];
var n = 3;
for (const i = 0; f.push(() => i), n--; f.push(() => i));
expect(f.map(g => g())).toEqual([0, 0, 0, 0, 0, 0, 0]);
