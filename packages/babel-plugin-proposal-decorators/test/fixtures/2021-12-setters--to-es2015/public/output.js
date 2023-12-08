var _initProto, _class;
const dec = () => {};
class Foo {
  constructor(...args) {
    babelHelpers.defineProperty(this, "value", 1);
    _initProto(this);
  }
  set a(v) {
    return this.value = v;
  }
  set ['b'](v) {
    return this.value = v;
  }
}
_class = Foo;
[_initProto] = babelHelpers.applyDecs(_class, [[dec, 4, "a"], [dec, 4, 'b']], []);
