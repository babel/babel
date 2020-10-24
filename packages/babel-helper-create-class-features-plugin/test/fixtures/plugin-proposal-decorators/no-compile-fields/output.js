class B {
  #foo = 1;
  bar = 2;
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
      kind: "method",
      decorators: [deco],
      key: "foo",
      value: function foo() {}
    }, {
      kind: "field",
      key: "bar",

      value() {
        return 2;
      }

    }]
  };
});
