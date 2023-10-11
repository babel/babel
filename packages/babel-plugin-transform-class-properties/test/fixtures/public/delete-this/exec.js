class Foo {
  x = delete this;
  static x = delete this;
}

expect(new Foo().x).toBe(true);
expect(Foo.x).toBe(true);
