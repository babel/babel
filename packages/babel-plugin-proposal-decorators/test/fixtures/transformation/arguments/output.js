let A = babelHelpers.decorateBase([dec(a, b, ...c)], function (_initialize) {
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
      decorators: [dec(a, b, ...c)],
      key: "method",
      value: function method() {}
    }]
  };
}, void 0, [babelHelpers.decoratorsNov2018]);
