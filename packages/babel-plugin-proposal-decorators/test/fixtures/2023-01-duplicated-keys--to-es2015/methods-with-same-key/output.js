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
[_initProto] = babelHelpers.applyDecs2301(Foo, [[dec, 2, "a"], [dec, 2, "a"]], []).e;
