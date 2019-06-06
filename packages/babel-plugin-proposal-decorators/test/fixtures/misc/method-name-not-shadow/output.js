var _method = 1;
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
      key: "method",
      value: function method() {
        return _method;
      }
    }]
  };
});
