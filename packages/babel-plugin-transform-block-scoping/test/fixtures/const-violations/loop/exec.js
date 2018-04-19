expect(function() {
  for (const i = 0; i < 3; i = i + 1) {
    // whatever
  }
}).toThrow('"i" is read-only');
