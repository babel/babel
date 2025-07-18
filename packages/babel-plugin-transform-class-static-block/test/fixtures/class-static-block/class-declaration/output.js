var _staticBlock;
class Foo {
  static bar = (_staticBlock = () => this.foo = this.bar, 42);
}
_staticBlock();
expect(Foo.foo).toBe(42);
