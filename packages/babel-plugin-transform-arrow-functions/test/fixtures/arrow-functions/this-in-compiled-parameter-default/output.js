function sameReceiver() {
  var _this = this;
  let read = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
    return _this;
  };
  return read() === this;
}
