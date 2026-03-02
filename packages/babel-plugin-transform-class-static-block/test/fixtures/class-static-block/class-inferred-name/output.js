var _staticBlock, _staticBlock2;
let Foo = (class {
  static #_ = _staticBlock = () => (babelHelpers.setFunctionName(this, "Foo"), (() => {
    expect(this.name).toBe("Foo");
    if (false) use(this);
  })(), this);
}, _staticBlock());
let obj = {
  ["someName"]: (class {
    static x = (_staticBlock2 = () => {
      if (false) use(this);
      expect(this.name).toBe("someName");
      return this;
    }, babelHelpers.setFunctionName(this, "someName"), expect(this.name).toBe("someName"));
  }, _staticBlock2())
};
expect(Foo.name).toBe("Foo");
expect(obj.someName.name).toBe("someName");
