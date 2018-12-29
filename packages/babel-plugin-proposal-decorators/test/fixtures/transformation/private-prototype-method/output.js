let A = babelHelpers.decorate([deco], function (_initialize) {
  "use strict";

  class A {
    constructor() {
      _initialize(this);
    }

  }

  var _foo = new WeakMap();

  return {
    F: A,
    d: [{
      kind: "method",
      key: babelHelpers.privateName(_foo, "foo"),

      value() {}

    }, {
      kind: "method",
      key: "test",

      value() {
        babelHelpers.classPrivateFieldGet(this, _foo).call(this);
      }

    }]
  };
}, void 0, [babelHelpers.privateName()]);
