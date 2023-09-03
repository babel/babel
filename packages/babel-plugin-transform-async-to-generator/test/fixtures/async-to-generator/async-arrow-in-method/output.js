let TestClass = {
  name: "John Doe",
  testMethodFailure() {
    var _this = this,
      _ref;
    return new Promise( /*#__PURE__*/function (_x) {
      return (_ref = _ref || babelHelpers.asyncToGenerator(function* (resolve) {
        console.log(_this);
        setTimeout(resolve, 1000);
      })).apply(this, arguments);
    });
  }
};
