var _initProto, _computedKey, _computedKey2;
const dec = () => {};
_computedKey = babelHelpers.toPropertyKey(getKey());
_computedKey2 = babelHelpers.toPropertyKey(getKey());
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs2311(this, [], [[dec, 2, _computedKey], [dec, 2, _computedKey2]]).e;
  }
  constructor() {
    _initProto(this);
  }
  [_computedKey]() {
    return 1;
  }
  [_computedKey2]() {
    return 2;
  }
}
