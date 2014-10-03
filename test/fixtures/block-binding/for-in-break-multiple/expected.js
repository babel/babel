for (var i in arr) {
  var _break = false;
  (function () {
    var val = arr[i];
    for (i in arr) {
      var _break2 = false;
      (function () {
        var val2 = arr[i];
        return _break2 = true;
      }());
      if (_break2) break;
    }
    return _break = true;
  }());
  if (_break) break;
}
