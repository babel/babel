let B = babelHelpers.decorate([dec], function (_initialize, _A) {
  "use strict";

  class B extends _A {
    constructor() {
      super();

      _initialize(this);
    }

  }

  return {
    F: B,
    d: []
  };
}, A, [babelHelpers.privateName()]);
