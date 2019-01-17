let B = babelHelpers.decorateBase([dec], function (_initialize, _A) {
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
}, A, [babelHelpers.decoratorsNov2018]);
