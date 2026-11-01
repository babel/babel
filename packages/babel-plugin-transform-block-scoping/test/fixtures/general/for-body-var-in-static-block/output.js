var _loop = function (i) {
  class A {
    static {
      var x = i;
    }
  }
  (function () {
    return i;
  });
};
for (var i = 0; i < 2; i++) {
  _loop(i);
}
