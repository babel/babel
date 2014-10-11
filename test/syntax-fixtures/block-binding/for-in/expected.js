(function () {
  for (var i in arr) {
    (function () {
      var val = arr[i];
      console.log(val * 2);
    }());
  }
}());
