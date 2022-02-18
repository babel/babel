const foo = x => x.y
const result = null ?> # |> foo(#);

expect(result).toBe(undefined);
