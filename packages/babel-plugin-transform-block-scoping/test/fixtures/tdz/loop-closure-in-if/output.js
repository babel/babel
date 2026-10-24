var f = [];
if (true) {
  var _loop = function (i) {
    f.push(() => i);
  };
  for (var i = 0; i < 2; i++) {
    _loop(i);
  }
}
