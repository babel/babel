(function () {
  for (var i in arr) {
    (function () {
      var MULTIPLIER = 5;
      console.log(arr[i] * MULTIPLIER);
    }());
  }
}());
