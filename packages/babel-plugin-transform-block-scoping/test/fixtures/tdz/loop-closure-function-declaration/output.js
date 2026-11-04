var f = [];
var _loop = function (i) {
  function k() {
    return i;
  }
  f.push(k);
};
for (var i = 0; i < 2; i++) {
  _loop(i);
}
