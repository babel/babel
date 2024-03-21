var _obj;
foo = _obj = {
  bar: function () {
    return babelHelpers.superPropertySet(_obj, "baz", babelHelpers.superPropertyGetCall(_obj, "baz", this) ** 12, this, 0);
  }
};
