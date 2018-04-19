function destructureArguments(x, y) {
  [arguments[0], [arguments[1]]] = [1, [2]]
  return x + y;
}

// ----------------------------------------------------------------------------

expect(destructureArguments(1, 2)).toBe(3);
