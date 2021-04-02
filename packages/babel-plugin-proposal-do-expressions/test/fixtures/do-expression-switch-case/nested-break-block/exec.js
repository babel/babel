const x = (n) => do {
  switch (n) {
    case 0:
      { "a"; { break; } }
      { "b"; };
    case 1:
      { "c"; }
      { "d"; { { { { break; }}}}};
    case 2:
    case 3:
      { "e"; { if (true) { break; } } }
      { break; }
    case 4:
      { "g"; { { break; "h"; } "i" } }
    case 5:
    case 6:
      if (n === 5) {
        "j"
      } else {
        "k"
      }
      { break; "l" }
    case 7:
  }
}

expect(x(0)).toBe('a')
expect(x(1)).toBe('d')
expect(x(2)).toBeUndefined()
expect(x(3)).toBeUndefined()
expect(x(4)).toBe("g")
expect(x(5)).toBe("j")
expect(x(6)).toBe("k")
expect(x(7)).toBeUndefined()
