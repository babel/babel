var _obj;
foo = _obj = {
  bar() {
    return babelHelpers.superPropSet(_obj, "baz", Math.pow(babelHelpers.superPropGet(_obj, "baz", this), 12), this, 0);
  }
};
