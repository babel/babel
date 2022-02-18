const foo = x => x.y

const result = undefined ?> foo(#);

expect(result).toBe(undefined);
