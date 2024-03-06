let _computedKey, _computedKey2;
var _initProto;
const dec = () => {};
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs2203R(this, [[dec, 2, _computedKey], [dec, 2, _computedKey2]], []).e;
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
