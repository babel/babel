let Foo = babelHelpers.decorateBase([deco], function (_initialize) {
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
}, void 0, [babelHelpers.decoratorsNov2018]);
