let TestClass = {
  name: "John Doe",

  testMethodFailure() {
    var _this = this;

    function _wrapped() {
      _wrapped = babelHelpers.asyncToGenerator(function* (resolve) {
        console.log(_this);
        setTimeout(resolve, 1000);
      });
      return _wrapped.apply(this, arguments);
    }

    return new Promise(function (_x) {
      return _wrapped.apply(this, arguments);
    });
  }

};
