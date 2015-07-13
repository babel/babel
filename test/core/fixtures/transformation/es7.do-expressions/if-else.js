assert.equal(do {
  if (false) {
    "foo";
  } else {
    "bar";
  }
}, "bar");
