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

      async value() {}

    }, {
      kind: "method",
      key: "f2",

      *value() {}

    }, {
      kind: "method",
      key: "f3",

      async *value() {}

    }]
  };
});
