let A = babelHelpers.decorate([dec], function (_initialize, _buildPrivateName, _B) {
  "use strict";

  class A extends _B {
    constructor(...args) {
      super(...args);

      _initialize(this);
    }

  }

  return {
    F: A,
    d: []
  };
}, babelHelpers.privateNameUtils(), B);
