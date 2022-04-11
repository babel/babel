const x = (n) => do {
  switch (n) {
    case 0: 
      'a';
      break;
      'b';
      'c';
      break;
      'd';
    case 6: 
      'e';
    default:
      'f'
  }
}

expect(x(0)).toBe('a');
expect(x(1)).toBe('f');
expect(x(6)).toBe('f');