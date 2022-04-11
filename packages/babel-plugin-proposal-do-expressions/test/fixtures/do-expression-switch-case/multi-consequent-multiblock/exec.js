const x = (n) => do {
  switch (n) {
    case 0: 
      { "a"; }
      { break; }
      { "b"; };
    case 1: 
      { "a"; }
      break;
      { "b"; };
    case 2: 
      "a";
      { break; }
      "b";
    case 3:
      "a";
      { "b"; break; }
      { "c"; }
    case 4:
      { "a"; }
      { "b"; }
      { "c"; break; "d" }
      { "e"; break; "f" }
    case 5:
      { "a"; }
      { break; "b"; }
      { break; "c"; }
  }
}

expect(x(0)).toBe('a')
expect(x(1)).toBe('a')
expect(x(2)).toBe('a')
expect(x(3)).toBe('b')
expect(x(4)).toBe('c')
expect(x(5)).toBe('a')
