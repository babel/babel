var fs = [];
var _loop = function (_i) {
  if (!_first2) _i++, fs.push(function () {
    return _i;
  });
  if (!(fs.push(function () {
    return _i;
  }), _i < 2)) {
    i = _i;
    return 1;
  } // break
  console.log(_i);
  i = _i;
};
for (var i = 1, _first2 = true;; _first2 = false) {
  if (_loop(i)) break;
}
