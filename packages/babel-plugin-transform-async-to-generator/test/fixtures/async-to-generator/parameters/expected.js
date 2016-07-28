let foo = (() => {
  var _ref = babelHelpers.asyncToGenerator(function* (bar) {});

  return function foo(_x) {
    return _ref.apply(this, arguments);
  };
})();
