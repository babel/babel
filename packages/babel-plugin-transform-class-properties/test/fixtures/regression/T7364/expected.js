class MyClass {
  constructor() {
    var _this = this;

    this.myAsyncMethod = babelHelpers.asyncToGenerator(function* () {
      console.log(_this);
    });
  }

}
