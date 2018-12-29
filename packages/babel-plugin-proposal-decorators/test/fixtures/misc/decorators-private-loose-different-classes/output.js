let Foo = babelHelpers.decorate([deco], function (_initialize) {
  "use strict";

  class Foo {
    constructor() {
      _initialize(this);
    }

  }

  return {
    F: Foo,
    d: []
  };
}, void 0, [babelHelpers.privateName()]);

class Bar {
  constructor() {
    Object.defineProperty(this, _x, {
      writable: true,
      value: 2
    });
  }

}

var _x = babelHelpers.classPrivateFieldLooseKey("x");
