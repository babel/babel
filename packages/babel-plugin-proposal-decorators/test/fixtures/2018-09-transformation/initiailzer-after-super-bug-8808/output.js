let Sub = babelHelpers.decorate([decorator(parameter)], function (_initialize, _Super) {
  "use strict";

  class Sub extends _Super {
    constructor() {
      (super(), _initialize(this), this).method();
    }
  }
  return {
    F: Sub,
    d: []
  };
}, Super);
