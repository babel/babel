var _initProto, _class;
const dec = () => {};
class Foo {
  constructor(...args) {
    babelHelpers.defineProperty(this, "value", 1);
    _initProto(this);
  }
  get a() {
    return this.value;
  }
  get ['b']() {
    return this.value;
  }
}
_class = Foo;
[_initProto] = babelHelpers.applyDecs2203R(_class, [[dec, 3, "a"], [dec, 3, 'b']], []).e;
