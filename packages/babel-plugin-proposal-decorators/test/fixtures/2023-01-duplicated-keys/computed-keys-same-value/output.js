var _computedKey, _computedKey2, _initProto;
const dec = () => {};
_computedKey = getKeyI();
_computedKey2 = getKeyJ();
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs2301(this, [[dec, 2, _computedKey], [dec, 2, _computedKey2]], []).e;
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
