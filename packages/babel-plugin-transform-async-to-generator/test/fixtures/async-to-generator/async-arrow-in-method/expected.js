let TestClass = {
  name: "John Doe",

  testMethodFailure() {
    var _this = this;

    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref = babelHelpers.asyncToGenerator(function* (resolve) {
        console.log(_this);
        setTimeout(resolve, 1000);
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

};
