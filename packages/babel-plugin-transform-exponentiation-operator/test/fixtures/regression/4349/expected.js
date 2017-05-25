var _obj;

foo = _obj = {
  bar() {
    return babelHelpers.set(_obj.__proto__ || Object.getPrototypeOf(_obj), "baz", Math.pow(babelHelpers.get(_obj.__proto__ || Object.getPrototypeOf(_obj), "baz", this), 12), this);
  }
};
