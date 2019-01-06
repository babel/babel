let A = babelHelpers.decorate(null, function (_initialize) {
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
      decorators: [deco],
      key: "prop",
      value: void 0
    }, {
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
