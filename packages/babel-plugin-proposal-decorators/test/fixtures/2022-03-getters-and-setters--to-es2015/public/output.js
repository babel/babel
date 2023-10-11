var _computedKey, _computedKey2, _initProto, _class;
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
_class = Foo;
[_initProto] = babelHelpers.applyDecs2203R(_class, [[dec, 3, "a"], [dec, 4, "a"], [dec, 3, _computedKey], [dec, 4, _computedKey2]], []).e;
