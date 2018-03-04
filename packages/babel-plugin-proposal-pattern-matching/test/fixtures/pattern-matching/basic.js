assert.equal(match(3) {
  3: "bar",
  else: "foo"
}, "bar");

assert.equal(match(4) {
  3: "bar",
  else: "foo"
}, "foo");
