function* g() {
  var o = {
    [arguments[0]]() {},
    [this.k]() {}
  };
  yield o;
}
