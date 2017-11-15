var test = {
    a: 1,
    b: 2,
    c: 3,
};

assert.equal(match(test) {
  {a}: "bar",
  else: "foo"
}, "bar");

assert.equal(match(test) {
  {a}: a + 100,
  else: "foo"
}, 101);
