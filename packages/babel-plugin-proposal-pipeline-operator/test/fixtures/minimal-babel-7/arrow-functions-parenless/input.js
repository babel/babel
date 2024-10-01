const y = 2;
const f = (x) => x
  |> (y => y + 1)
  |> (z => z * y)

const g = (x) => x
  |> (y =>
    y + 1
    |> (z => z * y)
  )

const h = (x) => x
  |> (y => (
    y + 1
    |> (z => z * y)
  ))

expect(f(1)).toBe(4);
expect(g(1)).toBe(2);
expect(h(1)).toBe(2);
