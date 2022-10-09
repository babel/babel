var _computedKey, _initProto;
const dec = () => {};
_computedKey = 'b';
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[dec, 2, "a"], [dec, 2, _computedKey]], []);
  }
  constructor(...args) {
    _initProto(this);
  }
  value = 1;
  a() {
    return this.value;
  }
  [_computedKey]() {
    return this.value;
  }
}
