var f = [],
  n = 0;
var _loop = function (i) {
    if (!(f.push(function () {
      return i;
    }), typeof g == "undefined" && n++ < 2)) return 1; // break
    {
      var _g = function () {};
      g = _g;
    }
  },
  g;
for (var i = 0;; i++) {
  if (_loop(i)) break;
}
