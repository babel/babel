function _wrapped() {
  _wrapped = babelHelpers.asyncToGenerator(function* (bar) {
    return yield this.baz(bar);
  });
  return _wrapped.apply(this, arguments);
}

let obj = {
  a: 123,

  foo(_x) {
    return _wrapped.apply(this, arguments);
  }

};
