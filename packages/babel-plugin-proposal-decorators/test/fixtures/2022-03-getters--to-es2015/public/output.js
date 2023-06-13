var _computedKey, _initProto, _class;
const dec = () => {};
_computedKey = 'b';
class Foo {
  constructor(...args) {
    babelHelpers.defineProperty(this, "value", 1);
    _initProto(this);
  }
  get a() {
    return this.value;
  }
  get [_computedKey]() {
    return this.value;
  }
}
_class = Foo;
[_initProto] = babelHelpers.applyDecs2203R(_class, [[dec, 3, "a"], [dec, 3, _computedKey]], []).e;
