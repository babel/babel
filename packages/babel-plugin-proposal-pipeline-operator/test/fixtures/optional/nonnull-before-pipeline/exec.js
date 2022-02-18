const inc = x => x + 1
const result = 5 ?> # |> inc(#);

expect(result).toBe(6);
