const result = 5 |> ^^ + 1 |> 2 + ^^ |> ^^ + ^^;

expect(result).toBe(12);
