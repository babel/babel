let a, result;
for (const [{...a}] of [[{ a: 0}]]) { result = a; }

expect(result).toEqual({ a: 0 });
