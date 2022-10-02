var _obj;
foo = _obj = {
  bar: function () {
    return babelHelpers.set(babelHelpers.getPrototypeOf(_obj), "baz", babelHelpers.get(babelHelpers.getPrototypeOf(_obj), "baz", this) ** 12, this, false);
  }
};
