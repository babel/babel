function decorate(value) {
  return function (target, propertyKey, descriptor) {};
}
let A = babelHelpers.decorate(null, function (_initialize) {
  "use strict";

  class A {
    constructor() {
      _initialize(this);
    }
  }
  return {
    F: A,
    d: [{
      kind: "field",
      decorators: [decorate(false)],
      key: "decoratedMember",
      value: void 0
    }]
  };
});
class B extends A {
  constructor() {
    super();
  }
  myMethod() {}
}
const b = new B();
