expect(do {
  if (false) {
    "foo";
  } else if (true) {
    "bar";
  }
}).toBe("bar");
