var foo = /*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
  var wat = yield bar();
});
var foo2 = /*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
    var wat = yield bar();
  }),
  bar = /*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
    var wat = yield foo();
  });
