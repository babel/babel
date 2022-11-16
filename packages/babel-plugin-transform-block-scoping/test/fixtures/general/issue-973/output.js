var arr = [];
for (var i = 0; i < 10; i++) {
  var _loop = function (i) {
    arr.push(function () {
      return i;
    });
  };
  for (var _i = 0; _i < 10; _i++) {
    _loop(_i);
  }
}
