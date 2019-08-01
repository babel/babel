const x = (n) => do {
  switch (n) {
    case 0: {
      'a';
      break;
    }
    case 1: {
      'b';
      break;
      'c';
      break;
      'd';
    }
    case 2: {
      'e';
      const a = 'e';
      break;
    }
    case 3: {
      const a = 'f';
      break;
      'f';
    }
    default: 'g';
  }
}

expect(x(0)).toBe('a');
expect(x(1)).toBe('b');
expect(x(2)).toBeUndefined();
expect(x(3)).toBeUndefined();
expect(x(4)).toBe('g');