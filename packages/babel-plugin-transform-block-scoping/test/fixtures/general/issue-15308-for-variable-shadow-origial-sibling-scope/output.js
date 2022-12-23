var _loop = function () {
  var x = i;
  (function () {
    return x;
  });
};
for (var i = 1; i < 3; i++) {
  _loop();
}
var _loop2 = function () {
  var y = _i;
  (function () {
    return y;
  });
};
for (var _i = 4; _i < 6; _i++) {
  _loop2();
}
