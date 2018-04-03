var test = {
  a: 1,
  b: 2,
  c: {
    cc: "hello",
    ccc: " world"
  }
};
assert.equal(match(test, {
  a: $,
  rest: $.rest
}, ({
  a: a,
  ...rest
}) => rest.b), 2);
assert.equal(match(test, {
  c: {
    cc: $,
    rest: $.rest
  }
}, ({
  c: {
    cc: cc,
    ...rest
  }
}) => cc + rest.ccc), "hello world");
