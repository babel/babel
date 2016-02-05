let TestClass = {
  name: "John Doe",

  testMethodFailure() {
    return new Promise((() => {
      var _this2 = this;

      var ref = babelHelpers.asyncToGenerator(function* (resolve) {
        console.log(_this2);
        setTimeout(resolve, 1000);
      }),
          _this = this;

      return function (_x) {
        return ref.apply(_this, arguments);
      };
    })());
  }
};
