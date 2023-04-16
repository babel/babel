var _initProto;
const dec = () => {};
class Foo {
  constructor(...args) {
    _initProto(this);
  }
  a() {
    return 1;
  }
  a() {
    return 2;
  }
}
[_initProto] = babelHelpers.applyDecs2303(Foo, [[[0, dec], 2, "a"], [[0, dec], 2, "a"]], []).e;
