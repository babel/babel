class Foo {
  #foo() { }
  #foo2() { }

  test(other) {
    return #foo in other;
  }
  test2(other) {
    return #foo2 in other;
  }
}

const cl = new Foo();

expect(cl.test({})).toBe(false);
expect(cl.test(cl)).toBe(true);
expect(cl.test2({})).toBe(false);
expect(cl.test2(cl)).toBe(true);
