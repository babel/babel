var fs = [];
var _loop = function () {
  for (var _i = k, f = function () {
      return _i;
    }, i = _i; i < 3; i++) {
    if (i === k) fs.push(f);
  }
};
for (var k = 0; k < 2; k++) {
  _loop();
}
