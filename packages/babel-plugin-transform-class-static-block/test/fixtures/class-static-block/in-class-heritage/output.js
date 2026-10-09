var _staticBlock, _staticBlock2, _staticBlock3;
class Foo extends (class extends (class Base {
  static #_ = _staticBlock = () => (this.qux = 21, this);
}, _staticBlock()) {
  static #_ = _staticBlock2 = () => (this.bar = 21, this);
}, _staticBlock2()) {
  static #_ = _staticBlock3 = () => this.foo = this.bar + this.qux;
}
_staticBlock3();
expect(Foo.foo).toBe(42);
