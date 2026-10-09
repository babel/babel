var foo = /*#__PURE__*/function () {
  var _foo = babelHelpers.asyncToGenerator(function* () {
    var wat = yield bar();
  });
  function foo() {
    return _foo.apply(this, arguments);
  }
  return foo;
}();
var foo2 = /*#__PURE__*/function () {
    var _foo2 = babelHelpers.asyncToGenerator(function* () {
      var wat = yield bar();
    });
    function foo2() {
      return _foo2.apply(this, arguments);
    }
    return foo2;
  }(),
  bar = /*#__PURE__*/function () {
    var _bar = babelHelpers.asyncToGenerator(function* () {
      var wat = yield foo();
    });
    function bar() {
      return _bar.apply(this, arguments);
    }
    return bar;
  }();
