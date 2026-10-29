var f = [],
  n = 0;
var _loop = function (i) {
    if (!(f.push(function () {
      return i;
    }), typeof g == "undefined" && n++ < 2)) return 1; // break
    {
      g = function () {};
    }
  },
  g;
for (var i = 0;; i++) {
  if (_loop(i)) break;
}
