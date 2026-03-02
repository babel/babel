// `blockExpressions` before `break` is hard to deal with
// https://github.com/babel/babel/pull/10070#discussion_r296048106
const x = (n) => do {
  switch (n) {
    case 0:
      { "a"; }
      { "b"; };
    case 1:
      { "c"; }
      break;
      { "d"; };
    case 2:
      "a";
      "b";
    case 3:
      {}
      { break; }
    case 4:
      { "d"; }
      { "e"; }
    case 5:
      "f";
    case 6:
      {}
    case 7:
  }
}

expect(x(0)).toBe('c')
expect(x(1)).toBe('c')
expect(x(2)).toBeUndefined()
expect(x(3)).toBeUndefined()
expect(x(4)).toBe('f')
expect(x(5)).toBe('f')
expect(x(6)).toBeUndefined()
expect(x(7)).toBeUndefined()
