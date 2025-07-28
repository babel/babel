var _staticBlock;
class Foo {
  static #bar = 21;
  static qux = (_staticBlock = () => this.qux2 = this.qux, (() => {
    this.foo = this.#bar;
    this.qux1 = this.qux;
  })(), (() => {
    if (foo) bar;
  })(), 21);
}
_staticBlock();
