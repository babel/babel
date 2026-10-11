function sameReceiver() {
  var _this = this;
  return function (read = function () {
    return _this;
  }) {
    return read() === _this;
  }();
}
