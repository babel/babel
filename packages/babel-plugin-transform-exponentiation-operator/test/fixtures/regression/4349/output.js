var _obj;
foo = _obj = {
  bar() {
    return babelHelpers.superPropertySet(_obj, "baz", Math.pow(babelHelpers.superPropertyGetCall(_obj, "baz", this), 12), this, 0);
  }
};
