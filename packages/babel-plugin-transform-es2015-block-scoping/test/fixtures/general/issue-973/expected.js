var arr = [];

var _ref = function (_i, arr) {
  arr.push(function () {
    return _i;
  });
};

for (var i = 0; i < 10; i++) {
  var _loop = _ref;

  for (var _i = 0; _i < 10; _i++) {
    _loop(_i, arr);
  }
}