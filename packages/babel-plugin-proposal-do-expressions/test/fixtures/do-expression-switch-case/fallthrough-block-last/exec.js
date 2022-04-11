const x = (n) => do {
  switch (n) {
    case 0: {
      'a';
    }
    case 1: {
      'b';
      break;
    }
    default: {
      'd';
    }
    case 2: {
      'c';
    }
    case 3:
    case 4:
  }
}

expect(x(0)).toBe('b');
expect(x(1)).toBe('b');
expect(x(2)).toBe('c');
expect(x(3)).toBeUndefined();
expect(x(4)).toBeUndefined();
expect(x(5)).toBe('c');