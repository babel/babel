expect(do {
  if (false) {
    "foo";
  } else {
    "bar";
  }
}).toBe("bar");
