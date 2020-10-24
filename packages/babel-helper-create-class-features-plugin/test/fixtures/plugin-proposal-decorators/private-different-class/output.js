let A = babelHelpers.decorate(null, function (_initialize) {
  "use strict";

  class A {
    constructor() {
      _initialize(this);
    }

  }

  return {
    F: A,
    d: [{
      kind: "method",
      decorators: [deco],
      key: "foo",
      value: function foo() {}
    }]
  };
});

var _priv = new WeakMap();

class B {
  constructor() {
    _priv.set(this, {
      writable: true,
      value: void 0
    });
  }

}
