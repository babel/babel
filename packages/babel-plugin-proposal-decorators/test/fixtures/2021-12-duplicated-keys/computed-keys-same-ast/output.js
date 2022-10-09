var _computedKey, _computedKey2, _initProto;
const dec = () => {};
_computedKey = getKey();
_computedKey2 = getKey();
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[dec, 2, _computedKey], [dec, 2, _computedKey2]], []);
  }
  constructor(...args) {
    _initProto(this);
  }
  [_computedKey]() {
    return 1;
  }
  [_computedKey2]() {
    return 2;
  }
}
