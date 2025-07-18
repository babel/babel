var _staticBlock, _temp, _staticBlock2, _temp2, _staticBlock3;
class Foo extends (_temp2 = class extends (_temp = class Base {
  static #_ = _staticBlock = () => this.qux = 21;
}, _staticBlock(), _temp) {
  static #_ = _staticBlock2 = () => this.bar = 21;
}, _staticBlock2(), _temp2) {
  static #_ = _staticBlock3 = () => this.foo = this.bar + this.qux;
}
_staticBlock3();
expect(Foo.foo).toBe(42);
