function f() {
  const a = "foo";

  if (false) a = "false";

  return a;
}

assert.equal(f(), "foo", 'Const violation in not taken branch should be ignored.')
