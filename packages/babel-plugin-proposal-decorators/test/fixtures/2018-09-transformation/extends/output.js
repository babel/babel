let A = babelHelpers.decorate([dec], function (_initialize, _B) {
  "use strict";

  class A extends _B {
    constructor() {
      super(...arguments);
      _initialize(this);
    }
  }
  return {
    F: A,
    d: []
  };
}, B);
