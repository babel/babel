class Foo {
  static bar = 42;
  static {
    this.foo = Foo.bar;
  }
}
const oldFoo = Foo;
Foo = null;

expect(oldFoo.foo).toBe(42);
