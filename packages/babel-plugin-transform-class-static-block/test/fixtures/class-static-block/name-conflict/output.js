var _staticBlock;
class Foo {
  static #_() {}
  // static block can not be transformed as `#_` here
  static #_2 = _staticBlock = () => this.foo = this.#_;
}
_staticBlock();
expect(Foo.foo).toBe(42);
