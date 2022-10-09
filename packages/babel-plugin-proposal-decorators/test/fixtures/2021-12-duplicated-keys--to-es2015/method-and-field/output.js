var _init_a, _initProto;
const dec = () => {};
class Foo {
  constructor() {
    babelHelpers.defineProperty(this, "a", (_initProto(this), _init_a(this, 123)));
  }
  a() {
    return 1;
  }
}
[_init_a, _initProto] = babelHelpers.applyDecs(Foo, [[dec, 2, "a"], [dec, 0, "a"]], []);
