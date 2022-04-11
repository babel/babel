function f() {
  const a = "foo";

  if (false) a = "false";

  return a;
}

expect(f()).toBe("foo");
