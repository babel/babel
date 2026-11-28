var _loop = function (i) {
  setTimeout(() => i);
  {
    function _c() {}
  }
  c;
};
for (var i of [1]) {
  _loop(i);
}
var c = 2;
