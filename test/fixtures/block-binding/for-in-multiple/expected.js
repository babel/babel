for (var i in arr) {
  (function () {
    var val = arr[i];
    console.log(val * 2);
    for (i in arr) {
      (function () {
        var x = arr[i];
        console.log(x * 2);
      }());
    }
  }());
}
