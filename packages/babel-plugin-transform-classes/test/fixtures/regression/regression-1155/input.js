class Foo extends Bar {
  constructor (options) {
    let parentOptions = {};
    parentOptions.init = function () {
      this;
    };
    super(parentOptions);
  }
}
