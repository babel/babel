var _computedKey, _computedKey2, _initProto;
const dec = () => {};
_computedKey = 'b';
_computedKey2 = 'b';
class Foo {
  constructor(...args) {
    babelHelpers.defineProperty(this, "value", 1);
    _initProto(this);
  }
  get a() {
    return this.value;
  }
  set a(v) {
    this.value = v;
  }
  get [_computedKey]() {
    return this.value;
  }
  set [_computedKey2](v) {
    this.value = v;
  }
}
[_initProto] = babelHelpers.applyDecs2303(Foo, [[[0, dec], 3, "a"], [[0, dec], 4, "a"], [[0, dec], 3, _computedKey], [[0, dec], 4, _computedKey2]], []).e;
