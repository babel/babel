var test = {
  a: 1,
  b: 2,
  c: 3
};
assert.equal(match(test, {
  a: $
}, ({
  a: a
}) => "bar", {
  b: 1
}, ({
  b: b
}) => "foo"), "bar");
assert.equal(match(test, {
  a: $
}, ({
  a: a
}) => a + 100, {
  d: $
}, ({
  d: d
}) => "foo"), 101);
assert.equal(match(test, {
  rest: $.rest
}, ({ ...rest
}) => rest.a + rest.b + rest.c), 6);
