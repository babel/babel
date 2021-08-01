var _privateFieldValue;

let results = [];

class Foo {
  #privateFieldValue = _privateFieldValue ||= function () {
    return 42;
  };

  constructor() {
    this.self, results.push(2), babelHelpers.readOnlyError("#privateFieldValue");
  }

  get self() {
    results.push(1);
    return this;
  }

}
