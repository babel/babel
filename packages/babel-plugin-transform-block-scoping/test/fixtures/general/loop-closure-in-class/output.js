var _loop = function (i) {
  class C {
    x = i;
  }
};
for (var i = 0; i < 2; i++) {
  _loop(i);
}
