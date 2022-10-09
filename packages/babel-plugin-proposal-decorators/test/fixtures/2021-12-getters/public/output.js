var _computedKey, _initProto;
const dec = () => {};
_computedKey = 'b';
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[dec, 3, "a"], [dec, 3, _computedKey]], []);
  }
  constructor(...args) {
    _initProto(this);
  }
  value = 1;
  get a() {
    return this.value;
  }
  get [_computedKey]() {
    return this.value;
  }
}
