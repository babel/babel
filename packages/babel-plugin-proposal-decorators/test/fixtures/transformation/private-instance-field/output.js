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
      kind: "field",
      key: babelHelpers.privateName(_foo, "foo"),

      value() {
        return 2;
      }

    }, {
      kind: "method",
      key: "test",

      value() {
        babelHelpers.classPrivateFieldGet(this, _foo);
      }

    }]
  };
}, void 0, [babelHelpers.privateName()]);
