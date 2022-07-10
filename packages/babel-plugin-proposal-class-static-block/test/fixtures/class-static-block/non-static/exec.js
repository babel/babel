class Foo {
  bar = 21;
  static {
    this.foo = this.bar;
  }
}
expect(Foo.foo).toBe(undefined);
