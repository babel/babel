let C = babelHelpers.decorate(null, function (_initialize) {
  "use strict";

  class C {
    constructor() {
      _initialize(this);
    }

  }

  return {
    F: C,
    d: [{
      kind: "field",
      decorators: [dec],
      key: "p",

      value() {
        return 1;
      }

    }, {
      kind: "field",
      static: true,
      key: "P",

      value() {
        return 2;
      }

    }, {
      kind: "method",
      key: "m",
      value: function m() {}
    }, {
      kind: "method",
      static: true,
      key: "M",
      value: function M() {}
    }]
  };
});
