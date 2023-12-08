var _initStatic, _class;
const dec = () => {};
class Foo {
  static get a() {
    return this.value;
  }
  static get ['b']() {
    return this.value;
  }
}
_class = Foo;
(() => {
  [_initStatic] = babelHelpers.applyDecs2305(_class, [[dec, 11, "a"], [dec, 11, 'b']], []).e;
  _initStatic(_class);
})();
babelHelpers.defineProperty(Foo, "value", 1);
