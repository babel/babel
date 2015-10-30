var _obj;

var o = _obj = {
  m() {
    return babelHelpers.get(Object.getPrototypeOf(_obj), "x", this);
  }
};
