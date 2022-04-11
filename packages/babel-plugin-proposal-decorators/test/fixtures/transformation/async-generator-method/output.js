let Foo = babelHelpers.decorate([decorator], function (_initialize) {
  "use strict";

  class Foo {
    constructor() {
      _initialize(this);
    }

  }

  return {
    F: Foo,
    d: [{
      kind: "method",
      key: "f1",
      value: async function f1() {}
    }, {
      kind: "method",
      key: "f2",
      value: function* f2() {}
    }, {
      kind: "method",
      key: "f3",
      value: async function* f3() {}
    }]
  };
});
