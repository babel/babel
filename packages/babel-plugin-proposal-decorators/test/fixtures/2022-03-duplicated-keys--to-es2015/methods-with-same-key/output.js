var _initProto, _class;
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
_class = Foo;
[_initProto] = babelHelpers.applyDecs2203R(_class, [[dec, 2, "a"], [dec, 2, "a"]], []).e;
