expect(do {
  x = do { 1; };
}).toBe(1);

expect(do {
  z = do { 1;;;; };
}).toBe(1)

expect(do {
  w = (do { 1;;;; });
}).toBe(1);

expect(do {
  k = do { ; };
}).toBe(undefined);