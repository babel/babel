var f = [];
var _loop = function (_i) {
  if (!_first2) f.push(function () {
    return _i;
  }), _i++;
  if (!(_i < 2)) {
    i = _i;
    return 1;
  } // break
  ;
  i = _i;
};
for (var i = 0, _first2 = true;; _first2 = false) {
  if (_loop(i)) break;
}
