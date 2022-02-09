const foo = x => x.y
const result = {y: null} ?> foo(#) ?> foo(#);

expect(result).toBe(undefined);
