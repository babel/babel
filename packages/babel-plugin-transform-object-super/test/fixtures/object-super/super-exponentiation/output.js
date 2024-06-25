var _obj;
foo = _obj = {
  bar: function () {
    return babelHelpers.superPropSet(_obj, "baz", babelHelpers.superPropGet(_obj, "baz", this) ** 12, this, 0);
  }
};
