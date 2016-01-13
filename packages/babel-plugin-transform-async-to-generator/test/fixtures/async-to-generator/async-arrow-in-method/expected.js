let TestClass = {
  name: "John Doe",

  testMethodFailure() {
    return new Promise((() => {
      var _this = this;

      var ref = babelHelpers.asyncToGenerator(function* (resolve) {
        console.log(_this);
        setTimeout(resolve, 1000);
      });
      return _x => ref.apply(this, arguments);
    })());
  }
};
