function foo() {
  arr.map(x => x * x);
  var f = (x, y) => x * y;
  (function () {
    return () => this;
  })();
  return {
    g: () => this
  }
}
