class Foo {
  static num = 0;
  static str = "foo";
}

expect(Foo.num).toBe(0);
expect(Foo.num = 1).toBe(1);
expect(Foo.str).toBe("foo");
expect(Foo.str = "bar").toBe("bar");
