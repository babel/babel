var _staticBlock;
class Foo {
  static bar = (_staticBlock = () => this.foo = Foo.bar, 42);
}
_staticBlock();
expect(Foo.foo).toBe(42);
