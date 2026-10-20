var f = [];
var _loop = function (_i, _first3) {
  if (_first3) _first3 = false;else f.push(function () {
    return _i;
  }), _i++;
  if (!(_i < 2)) {
    i = _i, _first2 = _first3;
    return 1;
  } // break
  ;
  i = _i, _first2 = _first3;
};
for (var i = 0, _first2 = true;;) {
  if (_loop(i, _first2)) break;
}
