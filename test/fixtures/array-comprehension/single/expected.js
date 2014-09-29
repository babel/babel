var arr = (function () {
  var _arr = [];

  [1, 2, 3].forEach(function (i) {
    _arr.push(i * i);
  });

  return _arr;
})();
