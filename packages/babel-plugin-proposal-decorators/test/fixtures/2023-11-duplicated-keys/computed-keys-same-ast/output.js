let _initProto, _computedKey, _computedKey2;
const dec = () => {};
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs2311(this, [], [[dec, 2, _computedKey], [dec, 2, _computedKey2]]).e;
  }
  constructor() {
    _initProto(this);
  }
  [_computedKey = babelHelpers.toPropertyKey(getKey())]() {
    return 1;
  }
  [_computedKey2 = babelHelpers.toPropertyKey(getKey())]() {
    return 2;
  }
}
