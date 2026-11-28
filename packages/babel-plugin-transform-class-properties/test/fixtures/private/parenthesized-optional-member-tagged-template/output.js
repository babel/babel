class Foo {
  test() {
    var _o$Foo, _o$Foo2;
    const o = {
      Foo: Foo
    };
    (Foo === null || Foo === void 0 ? void 0 : _m._.bind(Foo))``;
    (o === null || o === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _o$Foo = o.Foo, _m)._.bind(_o$Foo))``;
    ((_o$Foo2 = o.Foo) === null || _o$Foo2 === void 0 ? void 0 : babelHelpers.assertClassBrand(Foo, _o$Foo2, _m)._.bind(_o$Foo2))``;
  }
}
var _m = {
  _: function () {
    return this;
  }
};
new Foo().test();
