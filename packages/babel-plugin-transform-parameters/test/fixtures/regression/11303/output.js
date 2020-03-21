function test(date) {
  let defValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return function (date) {
    var date = date + defValue;
    return date;
  }(date);
}
