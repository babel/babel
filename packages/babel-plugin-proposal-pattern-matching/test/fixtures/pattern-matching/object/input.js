var test = {
    a: 1,
    b: 2,
    c: 3,
};

assert.equal(match(test) {
  {a} => "bar",
  {b: 1} => "foo"
}, "bar");

assert.equal(match(test) {
  {a} => a + 100,
  {d} => "foo"
}, 101);

assert.equal(match(test) {
  {...rest} => rest.a + rest.b + rest.c,
}, 6);
