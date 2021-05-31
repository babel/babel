var _obj;

foo = _obj = {
  bar() {
    return babelHelpers.set(babelHelpers.getPrototypeOf(_obj), "baz", Math.pow(babelHelpers.get(babelHelpers.getPrototypeOf(_obj), "baz", this), 12), this, false);
  }

};
