var fs = [];
var _loop = function () {
  for (var i = k, f = function () {
      return i;
    };;) {
    fs.push(f);
    break;
  }
};
for (var k = 0; k < 2; k++) {
  _loop();
}
