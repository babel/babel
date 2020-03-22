(function () {
  let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "__proto__";
  return function (i) {
    for (var i in {});
  }(i);
});
