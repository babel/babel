const x = (n) => do {
  switch (n) {
    case 0: {
      'a';
    }
    case 1: {
      'b';
      break;
    }
    case 2: {
      'c';
      break;
    }
    case 3: {
      break;
    }
    case 4: {
      'd';
      'e';
    }
    default: 'f';
  }
}

expect(x(0)).toBe('b');
expect(x(1)).toBe('b');
expect(x(2)).toBe('c');
expect(x(3)).toBeUndefined();
expect(x(4)).toBe('f');
expect(x(5)).toBe('f');