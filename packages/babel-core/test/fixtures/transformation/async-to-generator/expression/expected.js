var foo = function () {
  return babelHelpers.asyncToGenerator(function* () {
    var wat = yield bar();
  })();
};
