const foo = x => x.y

const result = {y: 42} ?> foo(#);

expect(result).toBe(42);
