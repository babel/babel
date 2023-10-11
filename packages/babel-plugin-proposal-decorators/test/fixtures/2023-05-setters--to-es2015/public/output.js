var _computedKey, _initProto, _class;
const dec = () => {};
_computedKey = 'b';
class Foo {
  constructor(...args) {
    babelHelpers.defineProperty(this, "value", 1);
    _initProto(this);
  }
  set a(v) {
    return this.value = v;
  }
  set [_computedKey](v) {
    return this.value = v;
  }
}
_class = Foo;
[_initProto] = babelHelpers.applyDecs2305(_class, [[dec, 4, "a"], [dec, 4, _computedKey]], []).e;
