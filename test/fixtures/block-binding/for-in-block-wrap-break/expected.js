var arr = [
  1,
  2,
  3
];
(function () {
  for (var i in arr) {
    var _break = false;
    (function () {
      var val = arr[i];
      console.log(val * 2);
      return _break = true;
    }());
    if (_break) break;
  }
}());
