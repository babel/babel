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
});
