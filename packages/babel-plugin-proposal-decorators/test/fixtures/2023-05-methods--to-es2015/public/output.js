var _computedKey, _initProto;
const dec = () => {};
_computedKey = 'b';
class Foo {
  constructor(...args) {
    babelHelpers.defineProperty(this, "value", 1);
    _initProto(this);
  }
  a() {
    return this.value;
  }
  [_computedKey]() {
    return this.value;
  }
}
[_initProto] = babelHelpers.applyDecs2305(Foo, [[dec, 2, "a"], [dec, 2, _computedKey]], []).e;
