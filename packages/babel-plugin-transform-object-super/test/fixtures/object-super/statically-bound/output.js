var _obj;

var o = _obj = {
  m: function () {
    return babelHelpers.get(babelHelpers.getPrototypeOf(_obj), "x", this);
  }
};
