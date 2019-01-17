async function* f() {
  let A = babelHelpers.decorateBase([yield dec1, await dec2], function (_initialize) {
    "use strict";

    class A {
      constructor() {
        _initialize(this);
      }

    }

    return {
      F: A,
      d: []
    };
  }, void 0, [babelHelpers.decoratorsNov2018]);
}
