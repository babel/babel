var _computedKey, _computedKey2, _initStatic, _class;
const dec = () => {};
_computedKey = 'b';
_computedKey2 = 'b';
class Foo {
  static get a() {
    return this.value;
  }
  static set a(v) {
    this.value = v;
  }
  static get [_computedKey]() {
    return this.value;
  }
  static set [_computedKey2](v) {
    this.value = v;
  }
}
_class = Foo;
(() => {
  [_initStatic] = babelHelpers.applyDecs2305(_class, [[dec, 11, "a"], [dec, 12, "a"], [dec, 11, _computedKey], [dec, 12, _computedKey2]], []).e;
  _initStatic(_class);
})();
babelHelpers.defineProperty(Foo, "value", 1);
