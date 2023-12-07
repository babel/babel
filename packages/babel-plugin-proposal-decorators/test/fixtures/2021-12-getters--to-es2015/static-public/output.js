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
  [_initStatic] = babelHelpers.applyDecs(_class, [[dec, 8, "a"], [dec, 8, 'b']], []);
  _initStatic(_class);
})();
babelHelpers.defineProperty(Foo, "value", 1);
