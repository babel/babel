var f = [];
var _loop = function (i) {
  if (!(f.push(function () {
    return i;
  }), i < 1)) return 1; // break
  ;
};
for (var i = 0;; i++) {
  if (_loop(i)) break;
}
