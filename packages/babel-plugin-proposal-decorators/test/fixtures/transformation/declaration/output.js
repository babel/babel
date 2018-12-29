let A = babelHelpers.decorate([dec()], function (_initialize) {
  "use strict";

  class A {
    constructor() {
      _initialize(this);
    }

  }

  return {
    F: A,
    d: []
  };
}, void 0, [babelHelpers.privateName()]);
