var foo =
/*#__PURE__*/
function () {
  var _ref = babelHelpers.asyncToGenerator(function* () {
    var wat = yield bar();
  });

  return function foo() {
    return _ref.apply(this, arguments);
  };
}();

var foo2 =
/*#__PURE__*/
function () {
  var _ref2 = babelHelpers.asyncToGenerator(function* () {
    var wat = yield bar();
  });

  return function foo2() {
    return _ref2.apply(this, arguments);
  };
}(),
    bar =
/*#__PURE__*/
function () {
  var _ref3 = babelHelpers.asyncToGenerator(function* () {
    var wat = yield foo();
  });

  return function bar() {
    return _ref3.apply(this, arguments);
  };
}();
