var _initProto, _class;
const dec = () => {};
class Foo {
  constructor(...args) {
    babelHelpers.defineProperty(this, "value", 1);
    _initProto(this);
  }
  a() {
    return this.value;
  }
  ['b']() {
    return this.value;
  }
}
_class = Foo;
[_initProto] = babelHelpers.applyDecs(_class, [[dec, 2, "a"], [dec, 2, 'b']], []);
