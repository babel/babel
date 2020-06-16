expect(do {
  x = do { 1; };
  z = do { 1;;;; };
  w = (do { 1;;;; });
})