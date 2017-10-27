assert.equal(do {
  if (false) {
    "foo";
  } else if (true) {
    "bar";
  }
}, "bar");
