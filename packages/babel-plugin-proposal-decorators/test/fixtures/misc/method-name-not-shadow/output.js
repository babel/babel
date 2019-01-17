var _method = 1;
let Foo = babelHelpers.decorateBase([decorator], function (_initialize) {
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
}, void 0, [babelHelpers.decoratorsNov2018]);
