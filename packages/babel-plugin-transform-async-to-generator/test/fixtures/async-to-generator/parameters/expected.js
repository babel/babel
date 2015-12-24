let foo = function () {
  var ref = babelHelpers.asyncToGenerator(function* (bar) {});
  return function foo(_x) {
    return ref.apply(this, arguments);
  };
}();
